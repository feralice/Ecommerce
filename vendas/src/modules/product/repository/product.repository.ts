import { CreateProductBodyDto } from "@/modules/product/dto/create-product.dto";
import { ProductEntity } from "@/modules/product/entity/product.entity";
import { DeleteResult, EntityManager, Repository } from "typeorm";
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

  async getProductById(productId: number): Promise<ProductEntity> {
    return await this.findOne({
      where: {
        id: productId,
      },
    });
  }

  async deleteProduct(product: ProductEntity): Promise<DeleteResult> {
    return this.delete({ id: product.id });
  }
}
