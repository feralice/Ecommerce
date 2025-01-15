import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateCartUseCase } from "@/modules/cart/domain/use-cases/create/create-cart.service";

describe("CreateCartUseCase Tests", () => {
  let createCartUseCase: CreateCartUseCase;
  let cartRepository: CartRepository;

  const mockCartRepository = {
    createCart: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCartUseCase,
        {
          provide: CartRepository,
          useValue: mockCartRepository,
        },
      ],
    }).compile();

    createCartUseCase = module.get<CreateCartUseCase>(CreateCartUseCase);
    cartRepository = module.get<CartRepository>(CartRepository);
  });

  it("should create a cart successfully", async () => {
    const userId = 1;
    const cartEntity = {
      id: 1,
      userId,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      cartProduct: [],
    } as CartEntity;

    mockCartRepository.createCart.mockResolvedValue(cartEntity);

    const result = await createCartUseCase.execute(userId);

    expect(result).toEqual(cartEntity);
    expect(mockCartRepository.createCart).toHaveBeenCalledTimes(1);
    expect(mockCartRepository.createCart).toHaveBeenCalledWith(userId);
  });

  it("should throw an error if repository fails", async () => {
    const userId = 1;
    mockCartRepository.createCart.mockRejectedValue(
      new Error("Repository Error"),
    );

    await expect(createCartUseCase.execute(userId)).rejects.toThrow(
      "Repository Error",
    );
    expect(mockCartRepository.createCart).toHaveBeenCalledWith(userId);
  });
});
