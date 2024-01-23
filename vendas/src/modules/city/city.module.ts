import { CacheModule as CacheModuleNest } from "@nestjs/cache-manager";
import { CacheModule } from "src/config/cache/cache.module";
import { CityController } from "./city.controller";
import { CityEntity } from "./entity/city.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityService } from "./city.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    CacheModuleNest.register({
      //ttl é o tempo de vida
      ttl: 1000000,
    }),
    TypeOrmModule.forFeature([CityEntity]),
    CacheModule,
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
