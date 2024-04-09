import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ProductResponseDto } from "@/modules/product/dto/product-response.dto";
import { CreateProductBodyDto } from "@/modules/product/dto/create-product.dto";
import { ProductService } from "@/modules/product/service/product.service";
import { ProductEntity } from "@/modules/product/entity/product.entity";
import { UserType } from "@/modules/user/enum/user-type.enum";
import { Roles } from "@/decorators/roles.decorator";
import { DeleteResult } from "typeorm";

@Controller("product")
@Roles(UserType.Admin, UserType.User)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/all-products")
  async findAllProduct(): Promise<ProductResponseDto[]> {
    return await this.productService.findAllProduct();
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post("/create-product")
  async createProduct(
    @Body() createProduct: CreateProductBodyDto,
  ): Promise<ProductEntity> {
    return await this.productService.createProduct(createProduct);
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Delete("/:productId")
  async deleteProduct(
    @Param("productId") productId: number,
  ): Promise<DeleteResult> {
    return await this.productService.deleteProduct(productId);
  }

  @Roles(UserType.Admin, UserType.User)
  @Get("/:productId")
  async findProductById(
    @Param("productId") productId: number,
  ): Promise<ProductEntity> {
    return await this.productService.findProductById(productId);
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Put("/:productId")
  async updateProduct(
    @Param("productId") productId: number,
    @Body() updateProduct: CreateProductBodyDto,
  ): Promise<ProductEntity> {
    return await this.productService.updateProduct(productId, updateProduct);
  }
}
