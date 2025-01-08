import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CategoryResponseDto } from "@/modules/category/application/dto/category-response.dto";
import { CreateCategoryDto } from "@/modules/category/application/dto/create-category.dto";
import { CategoryService } from "@/modules/category/domain/service/category.service";
import { CategoryEntity } from "@/modules/category/domain/entity/category.entity";
import { UserType } from "@/modules/user/enum/user-type.enum";
import { Roles } from "@/decorators/roles.decorator";

@Roles(UserType.Admin, UserType.User)
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<CategoryResponseDto[]> {
    return this.categoryService.findAllCategories();
  }

  @Roles(UserType.Admin)
  @Post("/create")
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() name: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(name);
  }
}
