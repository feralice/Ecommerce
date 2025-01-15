import { UpdateProductInCartService } from "@/modules/cart-product/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { FindCartByUserIdUseCase } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { CreateCartUseCase } from "@/modules/cart/domain/use-cases/create/create-cart.service";
import { InsertCartDTO } from "@/modules/cart/application/dto/cart.dto";
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InsertProductInCartUseCase {
  constructor(
    private readonly updateProductInCartService: UpdateProductInCartService,
    private readonly findCartByUserIdUseCase: FindCartByUserIdUseCase,
    private readonly createCartUseCase: CreateCartUseCase,
  ) {}

  async execute(
    insertCartDTO: InsertCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    let cart: CartEntity;
    try {
      cart = await this.findCartByUserIdUseCase.execute(userId, true);
    } catch {
      cart = await this.createCartUseCase.execute(userId);
    }

    await this.updateProductInCartService.insertProductInCart(
      insertCartDTO,
      cart,
    );

    return cart;
  }
}
