import { DeleteCartProductService } from "@/modules/cart-product/domain/use-cases/delete-product-cart/delete-product-cart.service";
import { FindCartByUserIdUseCase } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { Injectable } from "@nestjs/common";
import { DeleteResult } from "typeorm";

@Injectable()
export class DeleteProductCartUseCase {
  constructor(
    private readonly deleteProduct: DeleteCartProductService,
    private readonly findCartByUserIdUseCase: FindCartByUserIdUseCase,
  ) {}

  async execute(productId: number, userId: number): Promise<DeleteResult> {
    const cart = await this.findCartByUserIdUseCase.execute(userId);

    return this.deleteProduct.execute(productId, cart.id);
  }
}
