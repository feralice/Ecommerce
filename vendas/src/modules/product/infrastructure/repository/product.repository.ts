import { CreateProductBodyDto } from "@/modules/product/application/dto/create-product.dto";
import { ProductEntity } from "@/modules/product/domain/entity/product.entity";
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

  async updateProduct(
    product: ProductEntity,
    updateProduct: CreateProductBodyDto,
  ): Promise<ProductEntity> {
    return await this.save({
      ...product,
      ...updateProduct,
    });
  }
}
