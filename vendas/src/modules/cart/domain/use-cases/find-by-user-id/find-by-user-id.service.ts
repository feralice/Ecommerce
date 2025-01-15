import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class FindCartByUserIdUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: number, isRelations = false) {
    const cart = await this.cartRepository.findActiveCartByUserId(
      userId,
      isRelations,
    );

    if (!cart) {
      throw new NotFoundException("Cart active not found");
    }

    return cart;
  }
}
