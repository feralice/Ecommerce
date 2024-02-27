import { CategoryRepository } from "@/modules/category/repository/category.repository";
import { CategoryEntity } from "@/modules/category/entity/category.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async findAllCategories(): Promise<CategoryEntity[]> {
    try {
      return await this.categoryRepository.findAllCategories();
    } catch (error) {
      throw new NotFoundException("No categories found!");
    }
  }
}
