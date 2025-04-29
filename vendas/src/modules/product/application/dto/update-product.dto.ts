import { PRODUCT } from "@/modules/product/application/constants/product.constant";
import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductBodyDto {
  @ApiProperty({
    description: PRODUCT.DTO.UPDATE_PRODUCT.CATEGORY_ID.DESCRIPTION,
    example: PRODUCT.DTO.UPDATE_PRODUCT.CATEGORY_ID.EXAMPLE,
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: PRODUCT.DTO.UPDATE_PRODUCT.NAME.DESCRIPTION,
    example: PRODUCT.DTO.UPDATE_PRODUCT.NAME.EXAMPLE,
    required: false,
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: PRODUCT.DTO.UPDATE_PRODUCT.PRICE.DESCRIPTION,
    example: PRODUCT.DTO.UPDATE_PRODUCT.PRICE.EXAMPLE,
    required: false,
  })
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: PRODUCT.DTO.UPDATE_PRODUCT.IMAGE.DESCRIPTION,
    example: PRODUCT.DTO.UPDATE_PRODUCT.IMAGE.EXAMPLE,
    required: false,
  })
  @IsString()
  image?: string;
}
