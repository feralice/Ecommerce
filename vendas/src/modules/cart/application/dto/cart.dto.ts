import { CART } from "@/modules/cart/application/constants/cart.constant";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class InsertCartDTO {
  @ApiProperty({
    description: CART.DTO.INSERT_CART.PRODUCT_ID.DESCRIPTION,
    example: CART.DTO.INSERT_CART.PRODUCT_ID.EXAMPLE,
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: CART.DTO.INSERT_CART.AMOUNT.DESCRIPTION,
    example: CART.DTO.INSERT_CART.AMOUNT.EXAMPLE,
  })
  @IsNumber()
  amount: number;
}
