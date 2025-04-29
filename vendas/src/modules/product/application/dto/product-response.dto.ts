import { CategoryResponseDto } from "@/modules/category/application/dto/category-response.dto";
import { PRODUCT } from "@/modules/product/application/constants/product.constant";
import { ApiProperty } from "@nestjs/swagger";
export class ProductResponseDto {
  @ApiProperty({
    description: PRODUCT.DTO.PRODUCT_RESPONSE.ID.DESCRIPTION,
    example: PRODUCT.DTO.PRODUCT_RESPONSE.ID.EXAMPLE,
  })
  id: number;

  @ApiProperty({
    description: PRODUCT.DTO.PRODUCT_RESPONSE.NAME.DESCRIPTION,
    example: PRODUCT.DTO.PRODUCT_RESPONSE.NAME.EXAMPLE,
  })
  name: string;

  @ApiProperty({
    description: PRODUCT.DTO.PRODUCT_RESPONSE.PRICE.DESCRIPTION,
    example: PRODUCT.DTO.PRODUCT_RESPONSE.PRICE.EXAMPLE,
  })
  price: number;

  @ApiProperty({
    description: PRODUCT.DTO.PRODUCT_RESPONSE.IMAGE.DESCRIPTION,
    example: PRODUCT.DTO.PRODUCT_RESPONSE.IMAGE.EXAMPLE,
  })
  image: string;

  @ApiProperty({
    description: PRODUCT.DTO.PRODUCT_RESPONSE.CATEGORY.DESCRIPTION,
    type: () => CategoryResponseDto,
    required: false,
  })
  category?: CategoryResponseDto;
}
