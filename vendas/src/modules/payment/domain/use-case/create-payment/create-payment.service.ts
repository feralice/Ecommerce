import { BadRequestException, Injectable } from "@nestjs/common";

import { CalculateFinalPriceService } from "@/modules/payment/domain/use-case/calculate-final-price/calculate-final-price.service";
import { PaymentCreditCardEntity } from "@/modules/payment/domain/entities/payment-credit-card.entity";
import { PaymentPixEntity } from "@/modules/payment/domain/entities/payment-pix.entity";
import { PaymentRepository } from "@/modules/payment/infrastructure/payment.repository";
import { CreateOrderDTO } from "@/modules/order/application/dto/create-order.dto";
import { PaymentEntity } from "@/modules/payment/domain/entities/payment.entity";
import { ProductEntity } from "@/modules/product/domain/entity/product.entity";
import { PaymentType } from "@/modules/payment/application/enum/payment.enum";
import { CartEntity } from "@/modules/cart/domain/cart.entity";

@Injectable()
export class CreatePaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly calculateFinalPriceService: CalculateFinalPriceService,
  ) {}

  async execute(
    dto: CreateOrderDTO,
    products: ProductEntity[],
    cart: CartEntity,
  ): Promise<PaymentEntity> {
    const finalPrice = this.calculateFinalPriceService.execute(cart, products);

    if (dto.amountPayments) {
      return this.createCreditCardPayment(dto, finalPrice);
    }

    if (dto.codePix && dto.datePayment) {
      return this.createPixPayment(dto, finalPrice);
    }

    throw new BadRequestException(
      "Informe o número de parcelas ou os dados para pagamento via Pix.",
    );
  }

  private createCreditCardPayment(
    dto: CreateOrderDTO,
    finalPrice: number,
  ): Promise<PaymentEntity> {
    const payment = new PaymentCreditCardEntity(
      PaymentType.Done,
      finalPrice,
      0,
      finalPrice,
      dto,
    );
    return this.paymentRepository.createCreditCardPayment(payment);
  }

  private createPixPayment(
    dto: CreateOrderDTO,
    finalPrice: number,
  ): Promise<PaymentEntity> {
    const payment = new PaymentPixEntity(
      PaymentType.Done,
      finalPrice,
      0,
      finalPrice,
      dto,
    );
    return this.paymentRepository.createPixPayment(payment);
  }
}
