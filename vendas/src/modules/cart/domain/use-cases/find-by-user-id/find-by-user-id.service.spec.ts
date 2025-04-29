import { FindCartByUserIdUseCase } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { NotFoundException } from "@nestjs/common";

describe("FindCartByUserIdUseCase", () => {
  let useCase: FindCartByUserIdUseCase;
  let cartRepository: CartRepository;

  beforeEach(() => {
    cartRepository = {
      findActiveCartByUserId: jest.fn(),
    } as any;

    useCase = new FindCartByUserIdUseCase(cartRepository);
  });

  it("should return the cart when found", async () => {
    const userId = 1;
    const cartMock = { id: 123, userId };

    (cartRepository.findActiveCartByUserId as jest.Mock).mockResolvedValue(
      cartMock,
    );

    const result = await useCase.execute(userId);

    expect(cartRepository.findActiveCartByUserId).toHaveBeenCalledWith(
      userId,
      false,
    );
    expect(result).toEqual(cartMock);
  });

  it("should throw NotFoundException when no cart is found", async () => {
    const userId = 1;

    (cartRepository.findActiveCartByUserId as jest.Mock).mockResolvedValue(
      null,
    );

    await expect(useCase.execute(userId)).rejects.toThrow(NotFoundException);
  });

  it("should pass isRelations=true correctly to the repository", async () => {
    const userId = 1;
    const cartMock = { id: 456, userId };

    (cartRepository.findActiveCartByUserId as jest.Mock).mockResolvedValue(
      cartMock,
    );

    const result = await useCase.execute(userId, true);

    expect(cartRepository.findActiveCartByUserId).toHaveBeenCalledWith(
      userId,
      true,
    );
    expect(result).toEqual(cartMock);
  });
});
