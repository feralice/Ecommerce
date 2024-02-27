import { CategoryEntity } from "@/modules/category/entity/category.entity";
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
}
