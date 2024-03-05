import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ProductResponseDto } from "./dto/product-response.dto";
import { CreateProductBodyDto } from "./dto/create-product.dto";
import { ProductService } from "./service/product.service";
import { ProductEntity } from "./entity/product.entity";
import { UserType } from "../user/enum/user-type.enum";
import { Roles } from "@/decorators/roles.decorator";

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
}
