import { FindCartByUserIdUseCase } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { Injectable } from "@nestjs/common";
import { DeleteResult } from "typeorm";

const LINE_AFFECTED = 1;

@Injectable()
export class ClearCartUseCase {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly findCartByUserIdUseCase: FindCartByUserIdUseCase,
  ) {}

  async execute(userId: number): Promise<DeleteResult> {
    const cart = await this.findCartByUserIdUseCase.execute(userId);

    await this.cartRepository.deactivateCart(cart);

    return { raw: [], affected: LINE_AFFECTED };
  }
}
