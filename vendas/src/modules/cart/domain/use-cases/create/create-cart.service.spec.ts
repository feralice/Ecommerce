import { UpdateProductInCartService } from "@/modules/cart-product/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { CreateCartService } from "@/modules/cart/domain/use-cases/create/create-cart.service";
import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { CartRequestDto } from "@/modules/cart/application/dto/cart.dto";
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";

describe("CreateCartService", () => {
  let createCartService: CreateCartService;
  let cartRepository: CartRepository;
  let updateProductInCartService: UpdateProductInCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCartService,
        {
          provide: CartRepository,
          useValue: {
            verifyCartExists: jest.fn(),
            createCart: jest.fn(),
          },
        },
        {
          provide: UpdateProductInCartService,
          useValue: {
            insertProductInCart: jest.fn(),
          },
        },
      ],
    }).compile();

    createCartService = module.get<CreateCartService>(CreateCartService);
    cartRepository = module.get<CartRepository>(CartRepository);
    updateProductInCartService = module.get<UpdateProductInCartService>(
      UpdateProductInCartService,
    );
  });

  it("should be defined", () => {
    expect(createCartService).toBeDefined();
  });

  describe("execute", () => {
    it("should create a cart and insert product if no cart exists", async () => {
      const userId = 1;
      const cartRequestDto: CartRequestDto = { productId: 101, amount: 2 };
      const newCart: CartEntity = { id: 1, userId, active: true } as CartEntity;

      jest
        .spyOn(cartRepository, "verifyCartExists")
        .mockRejectedValue(new NotFoundException());
      jest.spyOn(cartRepository, "createCart").mockResolvedValue(newCart);
      jest
        .spyOn(updateProductInCartService, "insertProductInCart")
        .mockResolvedValue({} as any);

      const result = await createCartService.execute(userId, cartRequestDto);

      expect(cartRepository.verifyCartExists).toHaveBeenCalledWith(userId);
      expect(cartRepository.createCart).toHaveBeenCalledWith(userId);
      expect(
        updateProductInCartService.insertProductInCart,
      ).toHaveBeenCalledWith(cartRequestDto, newCart);
      expect(result).toEqual(newCart);
    });

    it("should use existing cart and insert product", async () => {
      const userId = 1;
      const cartRequestDto: CartRequestDto = { productId: 102, amount: 3 };
      const existingCart: CartEntity = {
        id: 2,
        userId,
        active: true,
      } as CartEntity;

      jest
        .spyOn(cartRepository, "verifyCartExists")
        .mockResolvedValue(existingCart);
      jest
        .spyOn(updateProductInCartService, "insertProductInCart")
        .mockResolvedValue({} as any);

      const result = await createCartService.execute(userId, cartRequestDto);

      expect(cartRepository.verifyCartExists).toHaveBeenCalledWith(userId);
      expect(cartRepository.createCart).not.toHaveBeenCalled();
      expect(
        updateProductInCartService.insertProductInCart,
      ).toHaveBeenCalledWith(cartRequestDto, existingCart);
      expect(result).toEqual(existingCart);
    });
  });

  describe("findCartByUserId", () => {
    it("should return a cart if found", async () => {
      const userId = 1;
      const cart: CartEntity = { id: 1, userId, active: true } as CartEntity;

      jest.spyOn(cartRepository, "verifyCartExists").mockResolvedValue(cart);

      const result = await createCartService.findCartByUserId(userId);

      expect(cartRepository.verifyCartExists).toHaveBeenCalledWith(userId);
      expect(result).toEqual(cart);
    });

    it("should throw NotFoundException if cart is not found", async () => {
      const userId = 1;

      jest
        .spyOn(cartRepository, "verifyCartExists")
        .mockRejectedValue(new NotFoundException());

      await expect(createCartService.findCartByUserId(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("createCart", () => {
    it("should create and return a new cart", async () => {
      const userId = 1;
      const newCart: CartEntity = { id: 3, userId, active: true } as CartEntity;

      jest.spyOn(cartRepository, "createCart").mockResolvedValue(newCart);

      const result = await createCartService.createCart(userId);

      expect(cartRepository.createCart).toHaveBeenCalledWith(userId);
      expect(result).toEqual(newCart);
    });
  });
});
