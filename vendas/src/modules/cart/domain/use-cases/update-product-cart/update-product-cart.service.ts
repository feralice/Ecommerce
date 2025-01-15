import { FindCartByUserIdUseCase } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { UpdateCartDTO } from "@/modules/cart/application/dto/update-cart.dto";
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { Injectable } from "@nestjs/common";
import { UpdateProductInCartService } from "@/modules/cart-product/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";

@Injectable()
export class UpdateProductInCartUseCase {
  constructor(
    private readonly updateProductInCartService: UpdateProductInCartService,
    private readonly findCartByUserIdUseCase: FindCartByUserIdUseCase,
  ) {}

  async execute(
    updateCartDTO: UpdateCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserIdUseCase.execute(userId);

    await this.updateProductInCartService.insertProductInCart(updateCartDTO, cart);

    return cart;
  }
}
