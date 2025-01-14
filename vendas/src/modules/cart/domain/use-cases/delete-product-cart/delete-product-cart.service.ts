import { DeleteCartProductService } from "@/modules/cart-product/domain/use-cases/delete-product-cart/delete-product-cart.service";
import { FindCartByUserId } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { DeleteResult } from "typeorm";

export class DeleteProductInCartService {
  constructor(
    private findCartByUserId: FindCartByUserId,
    private readonly deleteProductCartService: DeleteCartProductService,
  ) {}

  async execute(productId: number, userId: number): Promise<DeleteResult> {
    const cart = await this.findCartByUserId.execute(userId);
    return await this.deleteProductCartService.execute(productId, cart.id);
  }
}
