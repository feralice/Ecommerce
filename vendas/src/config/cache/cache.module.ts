import { CacheModule as CacheModuleNest } from "@nestjs/cache-manager";
import { CacheService } from "@/config/cache/cache.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    CacheModuleNest.register({
      //ttl é o tempo de vida
      ttl: 1000000,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
