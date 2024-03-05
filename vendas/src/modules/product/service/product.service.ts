import { ProductRepository } from "@/modules/product/repository/product.repository";
import { CreateProductBodyDto } from "@/modules/product/dto/create-product.dto";
import { CategoryService } from "@/modules/category/service/category.service";
import { ProductEntity } from "@/modules/product/entity/product.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async findAllProduct() {
    try {
      return this.productRepository.getAllProducts();
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProduct(
    createProduct: CreateProductBodyDto,
  ): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProduct.categoryId);
    try {
      return await this.productRepository.createProduct(createProduct);
    } catch (error) {
      throw new Error(error);
    }
  }
}
