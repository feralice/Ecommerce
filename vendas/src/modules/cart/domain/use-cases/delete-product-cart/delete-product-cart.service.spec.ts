import { DeleteCartProductService } from "@/modules/cart-product/domain/use-cases/delete-product-cart/delete-product-cart.service";
import { DeleteProductCartUseCase } from "@/modules/cart/domain/use-cases/delete-product-cart/delete-product-cart.service";
import { FindCartByUserIdUseCase } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { DeleteResult } from "typeorm";

describe("DeleteProductCartUseCase", () => {
  let deleteProductCartUseCase: DeleteProductCartUseCase;
  let deleteProduct: DeleteCartProductService;
  let findCartByUserIdUseCase: FindCartByUserIdUseCase;

  beforeEach(() => {
    deleteProduct = {
      execute: jest.fn(),
    } as any;

    findCartByUserIdUseCase = {
      execute: jest.fn(),
    } as any;

    deleteProductCartUseCase = new DeleteProductCartUseCase(
      deleteProduct,
      findCartByUserIdUseCase,
    );
  });

  it("should delete a product from the cart", async () => {
    const userId = 1;
    const productId = 10;
    const cartMock = { id: 123 };
    const deleteResultMock: DeleteResult = { raw: [], affected: 1 };

    (findCartByUserIdUseCase.execute as jest.Mock).mockResolvedValue(cartMock);
    (deleteProduct.execute as jest.Mock).mockResolvedValue(deleteResultMock);

    const result = await deleteProductCartUseCase.execute(productId, userId);

    expect(findCartByUserIdUseCase.execute).toHaveBeenCalledTimes(1);
    expect(findCartByUserIdUseCase.execute).toHaveBeenCalledWith(userId);

    expect(deleteProduct.execute).toHaveBeenCalledTimes(1);
    expect(deleteProduct.execute).toHaveBeenCalledWith(productId, cartMock.id);

    expect(result).toEqual(deleteResultMock);
  });
});
