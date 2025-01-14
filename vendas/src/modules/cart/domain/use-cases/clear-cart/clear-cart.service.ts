import { FindCartByUserId } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { DeleteResult } from "typeorm";

export class ClearCartService {
  constructor(
    private cartRepository: CartRepository,
    private findCartByUserId: FindCartByUserId,
  ) {}

  async execute(userId: number): Promise<DeleteResult> {
    const cart = await this.findCartByUserId.execute(userId);
    return await this.cartRepository.clearCart(cart);
  }
}
