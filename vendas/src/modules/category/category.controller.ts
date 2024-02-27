import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CategoryEntity } from "./entity/category.entity";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }
}
