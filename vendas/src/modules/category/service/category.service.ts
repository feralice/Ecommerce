import { CategoryRepository } from "@/modules/category/repository/category.repository";
import { CategoryEntity } from "@/modules/category/entity/category.entity";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAllCategories(): Promise<CategoryEntity[]> {
    try {
      return await this.categoryRepository.findAllCategories();
    } catch (error) {
      throw new NotFoundException("No categories found!");
    }
  }
}
