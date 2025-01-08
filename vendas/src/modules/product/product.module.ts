import { ProductRepository } from "@/modules/product/infrastructure/repository/product.repository";
import { ProductController } from "@/modules/product/application/product.controller";
import { ProductService } from "@/modules/product/domain/service/product.service";
import { ProductEntity } from "@/modules/product/domain/entity/product.entity";
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
