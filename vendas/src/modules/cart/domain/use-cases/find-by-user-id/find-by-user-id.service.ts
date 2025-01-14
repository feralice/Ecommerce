import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { NotFoundException } from "@nestjs/common";

export class FindCartByUserId {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: number): Promise<CartEntity> {
    const cart = await this.cartRepository.verifyCartExists(userId);
    if (!cart) {
      throw new NotFoundException("Cart not found");
    }
    return cart;
  }
}
