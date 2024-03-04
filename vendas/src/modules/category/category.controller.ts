import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CategoryResponseDto } from "@/modules/category/dto/category-response.dto";
import { CategoryService } from "@/modules/category/service/category.service";
import { UserType } from "@/modules/user/enum/user-type.enum";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoryEntity } from "./entity/category.entity";
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
