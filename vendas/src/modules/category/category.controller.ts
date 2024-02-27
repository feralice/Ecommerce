import { CategoryResponseDto } from "@/modules/category/dto/category-response.dto";
import { CategoryService } from "@/modules/category/service/category.service";
import { Controller, Get, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserType } from "@/modules/user/enum/user-type.enum";
import { Roles } from "@/decorators/roles.decorator";

@Roles(UserType.Admin, UserType.User)
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async findAllCategories(): Promise<CategoryResponseDto[]> {
    return this.categoryService.findAllCategories();
  }
}
