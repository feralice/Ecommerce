import { UpdateProductInCartService } from "@/modules/cart-product/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { InsertProductInCartUseCase } from "@/modules/cart/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { FindCartByUserIdUseCase } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { CreateCartUseCase } from "@/modules/cart/domain/use-cases/create/create-cart.service";
import { InsertCartDTO } from "@/modules/cart/application/dto/cart.dto";
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { Test, TestingModule } from "@nestjs/testing";

describe("InsertProductInCartUseCase", () => {
  let insertProductInCartUseCase: InsertProductInCartUseCase;
  let updateProductInCartService: UpdateProductInCartService;
  let findCartByUserIdUseCase: FindCartByUserIdUseCase;
  let createCartUseCase: CreateCartUseCase;

  const mockUpdateProductInCartService = {
    insertProductInCart: jest.fn(),
  };

  const mockFindCartByUserIdUseCase = {
    execute: jest.fn(),
  };

  const mockCreateCartUseCase = {
    execute: jest.fn(),
  };

  const mockCartEntity: CartEntity = {
    id: 1,
    userId: 1,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    cartProduct: [],
  };

  const mockInsertCartDTO: InsertCartDTO = {
    productId: 1,
    amount: 2,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InsertProductInCartUseCase,
        {
          provide: UpdateProductInCartService,
          useValue: mockUpdateProductInCartService,
        },
        {
          provide: FindCartByUserIdUseCase,
          useValue: mockFindCartByUserIdUseCase,
        },
        { provide: CreateCartUseCase, useValue: mockCreateCartUseCase },
      ],
    }).compile();

    insertProductInCartUseCase = module.get<InsertProductInCartUseCase>(
      InsertProductInCartUseCase,
    );
    updateProductInCartService = module.get<UpdateProductInCartService>(
      UpdateProductInCartService,
    );
    findCartByUserIdUseCase = module.get<FindCartByUserIdUseCase>(
      FindCartByUserIdUseCase,
    );
    createCartUseCase = module.get<CreateCartUseCase>(CreateCartUseCase);
  });

  it("should insert product into an existing cart", async () => {
    mockFindCartByUserIdUseCase.execute.mockResolvedValue(mockCartEntity);
    mockUpdateProductInCartService.insertProductInCart.mockResolvedValue(
      undefined,
    );

    const result = await insertProductInCartUseCase.execute(
      mockInsertCartDTO,
      1,
    );

    expect(findCartByUserIdUseCase.execute).toHaveBeenCalledWith(1, true);
    expect(updateProductInCartService.insertProductInCart).toHaveBeenCalledWith(
      mockInsertCartDTO,
      mockCartEntity,
    );
    expect(result).toEqual(mockCartEntity);
  });

  it("should create a new cart and insert product when no active cart exists", async () => {
    mockFindCartByUserIdUseCase.execute.mockRejectedValue(
      new Error("Cart not found"),
    );
    mockCreateCartUseCase.execute.mockResolvedValue(mockCartEntity);
    mockUpdateProductInCartService.insertProductInCart.mockResolvedValue(
      undefined,
    );

    const result = await insertProductInCartUseCase.execute(
      mockInsertCartDTO,
      1,
    );

    expect(findCartByUserIdUseCase.execute).toHaveBeenCalledWith(1, true);
    expect(createCartUseCase.execute).toHaveBeenCalledWith(1);
    expect(updateProductInCartService.insertProductInCart).toHaveBeenCalledWith(
      mockInsertCartDTO,
      mockCartEntity,
    );
    expect(result).toEqual(mockCartEntity);
  });
});
