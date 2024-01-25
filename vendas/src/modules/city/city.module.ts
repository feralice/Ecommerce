import { CityEntity } from "@/modules/city/entity/city.entity";
import { CacheModule } from "@/config/cache/cache.module";
import { CityController } from "./city.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityService } from "./city.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), CacheModule],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
