import { ReturnCartProductDTO } from "@/modules/cart-product/application/dto/return-cart-product.dto";
import { CART } from "@/modules/cart/application/constants/cart.constant";
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ReturnCartDTO {
  @ApiProperty({
    description: CART.DTO.RETURN_CART.ID.DESCRIPTION,
    example: CART.DTO.RETURN_CART.ID.EXAMPLE,
  })
  id: number;

  @ApiProperty({
    description: CART.DTO.RETURN_CART.CART_PRODUCT.DESCRIPTION,
    type: [ReturnCartProductDTO],
    required: false,
  })
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
