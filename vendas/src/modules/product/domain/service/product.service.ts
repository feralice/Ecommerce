import { ProductRepository } from "@/modules/product/infrastructure/repository/product.repository";
import { CreateProductBodyDto } from "@/modules/product/application/dto/create-product.dto";
import { CategoryService } from "@/modules/category/domain/service/category.service";
import { ProductEntity } from "@/modules/product/domain/entity/product.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { DeleteResult, In } from "typeorm";

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

  async deleteProduct(productId: number): Promise<DeleteResult> {
    try {
      const product = await this.productRepository.getProductById(productId);
      return await this.productRepository.deleteProduct(product);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findProductById(productId: number): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.getProductById(productId);
      if (!product) {
        throw new NotFoundException("Produto não encontrado");
      }
      return product;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async updateProduct(
    productId: number,
    updateProduct: CreateProductBodyDto,
  ): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.getProductById(productId);

      return await this.productRepository.updateProduct(product, updateProduct);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(
    productId?: number[],
    isFindRelations?: boolean,
  ): Promise<ProductEntity[]> {
    let findOptions = {};

    if (productId && productId.length > 0) {
      findOptions = {
        where: {
          id: In(productId),
        },
      };
    }

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          category: true,
        },
      };
    }

    const products = await this.productRepository.find(findOptions);

    if (!products || products.length === 0) {
      throw new NotFoundException("Not found products");
    }

    return products;
  }
}
