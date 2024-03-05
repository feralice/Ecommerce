import { ProductRepository } from "@/modules/product/repository/product.repository";
import { ProductService } from "@/modules/product/service/product.service";
import { ProductController } from "@/modules/product/product.controller";
import { ProductEntity } from "@/modules/product/entity/product.entity";
import { CategoryModule } from "@/modules/category/category.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService, ProductRepository],
})
export class ProductModule {}
