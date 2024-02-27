import { CategoryEntity } from "@/modules/category/entity/category.entity";
import { Repository } from "typeorm";

export class CategoryRepository extends Repository<CategoryEntity> {
  async findAllCategories(): Promise<CategoryEntity[]> {
    return await this.find();
  }
}
