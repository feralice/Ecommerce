import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ProductResponseDto } from "@/modules/product/application/dto/product-response.dto";
import { CreateProductBodyDto } from "@/modules/product/application/dto/create-product.dto";
import { PRODUCT } from "@/modules/product/application/constants/product.constant";
import { ProductService } from "@/modules/product/domain/service/product.service";
import { ProductEntity } from "@/modules/product/domain/entity/product.entity";
import { UserType } from "@/modules/user/application/enum/user-type.enum";
import { Roles } from "@/decorators/roles.decorator";
import { DeleteResult } from "typeorm";

@ApiTags(PRODUCT.TAG)
@ApiBearerAuth()
@Roles(UserType.Admin, UserType.User)
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/all-products")
  @ApiOperation({
    summary: PRODUCT.FIND_ALL.SUMMARY,
    description: PRODUCT.FIND_ALL.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: PRODUCT.FIND_ALL.RESPONSE_DESCRIPTION,
    type: [ProductResponseDto],
  })
  async findAllProduct(): Promise<ProductResponseDto[]> {
    return await this.productService.findAllProduct();
  }

  @Post("/create-product")
  @ApiOperation({
    summary: PRODUCT.CREATE.SUMMARY,
    description: PRODUCT.CREATE.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PRODUCT.CREATE.RESPONSE_DESCRIPTION,
    type: ProductEntity,
  })
  async createProduct(
    @Body() createProduct: CreateProductBodyDto,
  ): Promise<ProductEntity> {
    return await this.productService.createProduct(createProduct);
  }

  @Delete("/:productId")
  @Roles(UserType.Admin)
  @ApiOperation({
    summary: PRODUCT.DELETE.SUMMARY,
    description: PRODUCT.DELETE.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: PRODUCT.DELETE.RESPONSE_DESCRIPTION,
    type: DeleteResult,
  })
  async deleteProduct(
    @Param("productId") productId: number,
  ): Promise<DeleteResult> {
    return await this.productService.deleteProduct(productId);
  }

  @Get("/:productId")
  @ApiOperation({
    summary: PRODUCT.FIND_BY_ID.SUMMARY,
    description: PRODUCT.FIND_BY_ID.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: PRODUCT.FIND_BY_ID.RESPONSE_DESCRIPTION,
    type: ProductEntity,
  })
  async findProductById(
    @Param("productId") productId: number,
  ): Promise<ProductEntity> {
    return await this.productService.findProductById(productId);
  }

  @Put("/:productId")
  @Roles(UserType.Admin)
  @ApiOperation({
    summary: PRODUCT.UPDATE.SUMMARY,
    description: PRODUCT.UPDATE.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: PRODUCT.UPDATE.RESPONSE_DESCRIPTION,
    type: ProductEntity,
  })
  async updateProduct(
    @Param("productId") productId: number,
    @Body() updateProduct: CreateProductBodyDto,
  ): Promise<ProductEntity> {
    return await this.productService.updateProduct(productId, updateProduct);
  }
}
