import { DeleteCartProductService } from "@/modules/cart-product/domain/use-cases/delete-product-cart/delete-product-cart.service";
import { CartProductRepository } from "@/modules/cart-product/infrastructure/cart-product.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { DeleteResult } from "typeorm";

describe("DeleteCartProductService", () => {
  let service: DeleteCartProductService;
  let repository: CartProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCartProductService,
        {
          provide: CartProductRepository,
          useValue: {
            deleteProductInCart: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteCartProductService>(DeleteCartProductService);
    repository = module.get<CartProductRepository>(CartProductRepository);
  });

it("should successfully delete a product from the cart", async () => {
    const productId = 1;
    const cartId = 123;
    const expectedResult: DeleteResult = { raw: [], affected: 1 };

    (repository.deleteProductInCart as jest.Mock).mockResolvedValue(
        expectedResult,
    );

    const result = await service.execute(productId, cartId);

    expect(repository.deleteProductInCart).toHaveBeenCalledTimes(1);
    expect(repository.deleteProductInCart).toHaveBeenCalledWith(
        productId,
        cartId,
    );
    expect(result).toEqual(expectedResult);
});
});
