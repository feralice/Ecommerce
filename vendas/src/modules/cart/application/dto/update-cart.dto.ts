import { CART } from "@/modules/cart/application/constants/cart.constant";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UpdateCartDTO {
  @ApiProperty({
    description: CART.DTO.UPDATE_CART.PRODUCT_ID.DESCRIPTION,
    example: CART.DTO.UPDATE_CART.PRODUCT_ID.EXAMPLE,
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: CART.DTO.UPDATE_CART.AMOUNT.DESCRIPTION,
    example: CART.DTO.UPDATE_CART.AMOUNT.EXAMPLE,
  })
  @IsNumber()
  amount: number;
}
