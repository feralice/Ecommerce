import { UpdateProductInCartService } from "@/modules/cart-product/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { UpdateProductInCartUseCase } from "@/modules/cart/domain/use-cases/update-product-cart/update-product-cart.service";
import { FindCartByUserIdUseCase } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { UpdateCartDTO } from "@/modules/cart/application/dto/update-cart.dto";
import { CartEntity } from "@/modules/cart/domain/cart.entity";

describe("UpdateProductInCartUseCase", () => {
  let useCase: UpdateProductInCartUseCase;
  let updateProductInCartService: UpdateProductInCartService;
  let findCartByUserIdUseCase: FindCartByUserIdUseCase;

  beforeEach(() => {
    updateProductInCartService = {
      insertProductInCart: jest.fn(),
    } as any;

    findCartByUserIdUseCase = {
      execute: jest.fn(),
    } as any;

    useCase = new UpdateProductInCartUseCase(
      updateProductInCartService,
      findCartByUserIdUseCase,
    );
  });

it("should update the product in the cart and return the cart", async () => {
    const userId = 1;
    const updateCartDTO: UpdateCartDTO = {
        productId: 10,
        amount: 3,
    };

    const cartMock = { id: 123 } as CartEntity;

    (findCartByUserIdUseCase.execute as jest.Mock).mockResolvedValue(cartMock);
    (
        updateProductInCartService.insertProductInCart as jest.Mock
    ).mockResolvedValue(undefined);

    const result = await useCase.execute(updateCartDTO, userId);

    expect(findCartByUserIdUseCase.execute).toHaveBeenCalledWith(userId);
    expect(updateProductInCartService.insertProductInCart).toHaveBeenCalledWith(
        updateCartDTO,
        cartMock,
    );
    expect(result).toEqual(cartMock);
});
});
