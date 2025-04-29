import { FindCartByUserIdUseCase } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { ClearCartUseCase } from "@/modules/cart/domain/use-cases/clear-cart/clear-cart.service";
import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { DeleteResult } from "typeorm";

describe("ClearCartUseCase", () => {
  let clearCartUseCase: ClearCartUseCase;
  let cartRepository: CartRepository;
  let findCartByUserIdUseCase: FindCartByUserIdUseCase;

  beforeEach(() => {
    cartRepository = {
      deactivateCart: jest.fn(),
    } as any;

    findCartByUserIdUseCase = {
      execute: jest.fn(),
    } as any;

    clearCartUseCase = new ClearCartUseCase(
      cartRepository,
      findCartByUserIdUseCase,
    );
  });

  it("should clear the cart and return a successful DeleteResult", async () => {
    const userId = 1;
    const cartMock = { id: 123 };
    const expectedResult: DeleteResult = { raw: [], affected: 1 };

    (findCartByUserIdUseCase.execute as jest.Mock).mockResolvedValue(cartMock);
    (cartRepository.deactivateCart as jest.Mock).mockResolvedValue(undefined);

    const result = await clearCartUseCase.execute(userId);

    expect(findCartByUserIdUseCase.execute).toHaveBeenCalledTimes(1);
    expect(findCartByUserIdUseCase.execute).toHaveBeenCalledWith(userId);

    expect(cartRepository.deactivateCart).toHaveBeenCalledTimes(1);
    expect(cartRepository.deactivateCart).toHaveBeenCalledWith(cartMock);

    expect(result).toEqual(expectedResult);
  });
});
