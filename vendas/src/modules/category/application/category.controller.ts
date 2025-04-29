import { CategoryResponseDto } from "@/modules/category/application/dto/category-response.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateCategoryDto } from "@/modules/category/application/dto/create-category.dto";
import { CATEGORY } from "@/modules/category/application/constants/category.constant";
import { CategoryService } from "@/modules/category/domain/service/category.service";
import { CategoryEntity } from "@/modules/category/domain/entity/category.entity";
import { UserType } from "@/modules/user/application/enum/user-type.enum";
import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { Roles } from "@/decorators/roles.decorator";

@ApiTags(CATEGORY.TAG)
@ApiBearerAuth()
@Roles(UserType.Admin, UserType.User)
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: CATEGORY.FIND_ALL.SUMMARY,
    description: CATEGORY.FIND_ALL.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CATEGORY.FIND_ALL.RESPONSE_DESCRIPTION,
    type: [CategoryResponseDto],
  })
  async findAllCategories(): Promise<CategoryResponseDto[]> {
    return this.categoryService.findAllCategories();
  }

  @Post("/create")
  @ApiOperation({
    summary: CATEGORY.CREATE.SUMMARY,
    description: CATEGORY.CREATE.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CATEGORY.CREATE.RESPONSE_DESCRIPTION,
    type: CategoryEntity,
  })
  async createCategory(
    @Body() name: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(name);
  }
}
