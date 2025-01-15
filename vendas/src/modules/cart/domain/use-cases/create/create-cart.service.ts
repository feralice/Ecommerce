
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: number): Promise<CartEntity> {
    return this.cartRepository.createCart(userId);
  }
}
