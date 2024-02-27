import { CityService } from "@/modules/city/service/city.service";
import { CityController } from "@/modules/city/city.controller";
import { CityEntity } from "@/modules/city/entity/city.entity";
import { CityRepository } from "./repository/city.repository";
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
