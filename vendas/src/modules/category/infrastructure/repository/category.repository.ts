import { CreateCategoryDto } from "@/modules/category/application/dto/create-category.dto";
import { CategoryEntity } from "@/modules/category/domain/entity/category.entity";
import { EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryRepository extends Repository<CategoryEntity> {
  constructor(manager: EntityManager) {
    super(CategoryEntity, manager);
  }
  async findAllCategories(): Promise<CategoryEntity[]> {
    return await this.find();
  }

  async createCategory(name: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.save(name);
  }

  async findByCategoryName({
    name,
  }: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.findOne({
      where: {
        name: name,
      },
    });
  }

  async findCategoryById(categoryId: number): Promise<CategoryEntity> {
    return await this.findOne({
      where: {
        id: categoryId,
      },
    });
  }
}
