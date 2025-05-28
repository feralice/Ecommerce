import { CreatePaymentService } from "@/modules/payment/domain/use-case/create-payment/create-payment.service";
import { PaymentCreditCardEntity } from "@/modules/payment/domain/entities/payment-credit-card.entity";
import { PaymentPixEntity } from "@/modules/payment/domain/entities/payment-pix.entity";
import { CreateOrderDTO } from "@/modules/order/application/dto/create-order.dto";
import { PaymentType } from "@/modules/payment/application/enum/payment.enum";
import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";

import { CalculateFinalPriceService } from "@/modules/payment/domain/use-case/calculate-final-price/calculate-final-price.service";
import { PaymentRepository } from "@/modules/payment/infrastructure/payment.repository";
import {
  mockCart,
  mockProducts,
} from "@/modules/payment/domain/mocks/payment.mock";

describe("CreatePaymentService", () => {
  let service: CreatePaymentService;
  let paymentRepository: PaymentRepository;
  let calculateFinalPriceService: CalculateFinalPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePaymentService,
        {
          provide: PaymentRepository,
          useValue: {
            createCreditCardPayment: jest.fn(),
            createPixPayment: jest.fn(),
          },
        },
        {
          provide: CalculateFinalPriceService,
          useValue: {
            execute: jest.fn().mockReturnValue(250),
          },
        },
      ],
    }).compile();

    service = module.get(CreatePaymentService);
    paymentRepository = module.get(PaymentRepository);
    calculateFinalPriceService = module.get(CalculateFinalPriceService);
  });

  describe("execute", () => {
    it("should create credit card payment if amountPayments is present", async () => {
      const dto: CreateOrderDTO = {
        amountPayments: 3,
        addressId: 1,
      };

      const mockPayment = new PaymentCreditCardEntity(
        PaymentType.Done,
        250,
        0,
        250,
        dto,
      );

      jest
        .spyOn(paymentRepository, "createCreditCardPayment")
        .mockResolvedValue(mockPayment);

      const result = await service.execute(dto, mockProducts, mockCart);

      expect(result).toEqual(mockPayment);
      expect(paymentRepository.createCreditCardPayment).toHaveBeenCalledWith(
        expect.any(PaymentCreditCardEntity),
      );
      expect(calculateFinalPriceService.execute).toHaveBeenCalledWith(
        mockCart,
        mockProducts,
      );
    });

    it("should create pix payment if codePix and datePayment are present", async () => {
      const dto: CreateOrderDTO = {
        codePix: "abc123",
        datePayment: "2025-05-27T12:00:00Z",
        addressId: 1,
      };

      const mockPayment = new PaymentPixEntity(
        PaymentType.Done,
        250,
        0,
        250,
        dto,
      );

      jest
        .spyOn(paymentRepository, "createPixPayment")
        .mockResolvedValue(mockPayment);

      const result = await service.execute(dto, mockProducts, mockCart);

      expect(result).toEqual(mockPayment);
      expect(paymentRepository.createPixPayment).toHaveBeenCalledWith(
        expect.any(PaymentPixEntity),
      );
      expect(calculateFinalPriceService.execute).toHaveBeenCalledWith(
        mockCart,
        mockProducts,
      );
    });

    it("should throw BadRequestException if no payment data is provided", async () => {
      const dto: CreateOrderDTO = { addressId: 1 };

      await expect(
        service.execute(dto, mockProducts, mockCart),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
