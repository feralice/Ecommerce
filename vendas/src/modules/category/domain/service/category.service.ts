import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CategoryRepository } from "@/modules/category/infrastructure/repository/category.repository";
import { CreateCategoryDto } from "@/modules/category/application/dto/create-category.dto";
import { CategoryEntity } from "@/modules/category/domain/entity/category.entity";

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

  async createCategory(name: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      const category = await this.findByCategoryName(name);

      if (category) {
        throw new ConflictException(`Category '${name.name}' already exists!`);
      }

      return await this.categoryRepository.createCategory(name);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error creating category: ${error.message}`,
      );
    }
  }

  async findByCategoryName(name: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      return await this.categoryRepository.findByCategoryName(name);
    } catch (error) {
      throw new NotFoundException(
        `Category with name '${name.name}' not found!`,
      );
    }
  }

  async findCategoryById(categoryId: number): Promise<CategoryEntity> {
    try {
      return await this.categoryRepository.findCategoryById(categoryId);
    } catch (error) {
      throw new NotFoundException(
        `Category with id '${categoryId}' not found!`,
      );
    }
  }
}
