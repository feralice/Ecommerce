import { CATEGORY } from "@/modules/category/application/constants/category.constant";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({
    description: CATEGORY.DTO.CREATE_CATEGORY.NAME.DESCRIPTION,
    example: CATEGORY.DTO.CREATE_CATEGORY.NAME.EXAMPLE,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
