import { ProductRepository } from "./repository/product.repository";
import { CategoryModule } from "../category/category.module";
import { ProductService } from "./service/product.service";
import { ProductController } from "./product.controller";
import { ProductEntity } from "./entity/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService, ProductRepository],
})
export class ProductModule {}
