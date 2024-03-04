import { CategoryEntity } from "@/modules/category/entity/category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
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
}
