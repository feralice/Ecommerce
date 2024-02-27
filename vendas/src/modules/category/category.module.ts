import { CategoryService } from "@/modules/category/service/category.service";
import { CategoryController } from "@/modules/category/category.controller";
import { CategoryEntity } from "@/modules/category/entity/category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
