import { ReturnCartProductDTO } from "@/modules/cart-product/application/dto/return-cart-product.dto";
import { CartEntity } from "@/modules/cart/domain/cart.entity";

export class ReturnCartDTO {
  id: number;
  cartProduct?: ReturnCartProductDTO[];

  constructor(cart: CartEntity) {
    this.id = cart.id;
    this.cartProduct = cart.cartProduct
      ? cart.cartProduct.map(
          (cartProduct) => new ReturnCartProductDTO(cartProduct),
        )
      : undefined;
  }
}
