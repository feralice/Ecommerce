import { CategoryRepository } from "@/modules/category/infrastructure/repository/category.repository";
import { CategoryController } from "@/modules/category/application/category.controller";
import { CategoryService } from "@/modules/category/domain/service/category.service";
import { CategoryEntity } from "@/modules/category/domain/entity/category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
