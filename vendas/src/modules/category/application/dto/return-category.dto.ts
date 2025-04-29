import { CATEGORY } from "@/modules/category/application/constants/category.constant";
import { ReturnProduct } from "@/modules/product/application/dto/product-return.dto";
import { CategoryEntity } from "@/modules/category/domain/entity/category.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ReturnCategory {
  @ApiProperty({
    description: CATEGORY.DTO.RETURN_CATEGORY.ID.DESCRIPTION,
    example: CATEGORY.DTO.RETURN_CATEGORY.ID.EXAMPLE,
  })
  id: number;

  @ApiProperty({
    description: CATEGORY.DTO.RETURN_CATEGORY.NAME.DESCRIPTION,
    example: CATEGORY.DTO.RETURN_CATEGORY.NAME.EXAMPLE,
  })
  name: string;

  @ApiProperty({
    description: CATEGORY.DTO.RETURN_CATEGORY.AMOUNT_PRODUCTS.DESCRIPTION,
    example: CATEGORY.DTO.RETURN_CATEGORY.AMOUNT_PRODUCTS.EXAMPLE,
    required: false,
  })
  amountProducts?: number;

  @ApiProperty({
    description: CATEGORY.DTO.RETURN_CATEGORY.PRODUCTS.DESCRIPTION,
    type: [ReturnProduct],
    required: false,
  })
  products?: ReturnProduct[];

  constructor(categoryEntity: CategoryEntity, amountProducts?: number) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
    this.amountProducts = amountProducts;
    this.products = categoryEntity.products
      ? categoryEntity.products.map((product) => new ReturnProduct(product))
      : undefined;
  }
}
