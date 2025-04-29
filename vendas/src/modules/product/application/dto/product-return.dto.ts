import { ReturnCategory } from "@/modules/category/application/dto/return-category.dto";
import { PRODUCT } from "@/modules/product/application/constants/product.constant";
import { ProductEntity } from "@/modules/product/domain/entity/product.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ReturnProduct {
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
    type: () => ReturnCategory,
    required: false,
  })
  category?: ReturnCategory;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.price = productEntity.price;
    this.image = productEntity.image;
    this.category = productEntity.category
      ? new ReturnCategory(productEntity.category)
      : undefined;
  }
}
