import { PRODUCT } from "@/modules/product/application/constants/product.constant";
import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductBodyDto {
  @ApiProperty({
    description: PRODUCT.DTO.CREATE_PRODUCT.CATEGORY_ID.DESCRIPTION,
    example: PRODUCT.DTO.CREATE_PRODUCT.CATEGORY_ID.EXAMPLE,
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: PRODUCT.DTO.CREATE_PRODUCT.NAME.DESCRIPTION,
    example: PRODUCT.DTO.CREATE_PRODUCT.NAME.EXAMPLE,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: PRODUCT.DTO.CREATE_PRODUCT.PRICE.DESCRIPTION,
    example: PRODUCT.DTO.CREATE_PRODUCT.PRICE.EXAMPLE,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: PRODUCT.DTO.CREATE_PRODUCT.IMAGE.DESCRIPTION,
    example: PRODUCT.DTO.CREATE_PRODUCT.IMAGE.EXAMPLE,
  })
  @IsString()
  image: string;
}
