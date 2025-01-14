import { UpdateProductInCartService } from "@/modules/cart-product/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { FindCartByUserId } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { CreateCartService } from "@/modules/cart/domain/use-cases/create/create-cart.service";
import { CartRequestDto } from "@/modules/cart/application/dto/cart.dto";
import { CartEntity } from "@/modules/cart/domain/cart.entity";

export class UpdateProductCartService {
  constructor(
    private readonly findCartByUserId: FindCartByUserId,
    private readonly createCart: CreateCartService,
    private readonly insertProductCartService: UpdateProductInCartService,
  ) {}

  async execute(
    updateCartDto: CartRequestDto,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId.execute(userId).catch(async () => {
      return this.createCart.createCart(userId);
    });

    await this.insertProductCartService.insertProductInCart(
      updateCartDto,
      cart,
    );

    return cart;
  }
}
