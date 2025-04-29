import { CATEGORY } from "@/modules/category/application/constants/category.constant";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryResponseDto {
  @ApiProperty({
    description: CATEGORY.DTO.CATEGORY_RESPONSE.ID.DESCRIPTION,
    example: CATEGORY.DTO.CATEGORY_RESPONSE.ID.EXAMPLE,
  })
  id: number;

  @ApiProperty({
    description: CATEGORY.DTO.CATEGORY_RESPONSE.NAME.DESCRIPTION,
    example: CATEGORY.DTO.CATEGORY_RESPONSE.NAME.EXAMPLE,
  })
  name: string;
}
