import { CityRepository } from "./infrastructure/repository/city.repository";
import { CityController } from "@/modules/city/application/city.controller";
import { CityService } from "@/modules/city/domain/service/city.service";
import { CityEntity } from "@/modules/city/domain/entity/city.entity";
import { CacheModule } from "@/config/cache/cache.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), CacheModule],
  controllers: [CityController],
  providers: [CityService, CityRepository],
  exports: [CityService, CityRepository],
})
export class CityModule {}
