import { CreateProductBodyDto } from "../dto/create-product.dto";
import { ProductEntity } from "../entity/product.entity";
import { EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(manager: EntityManager) {
    super(ProductEntity, manager);
  }
  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.find();
  }

  async createProduct(
    createProduct: CreateProductBodyDto,
  ): Promise<ProductEntity> {
    return await this.save({
      ...createProduct,
    });
  }
}
