import { CacheService } from "src/config/cache/cache.service";
import { InjectRepository } from "@nestjs/typeorm";
import { CityEntity } from "./entity/city.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, () =>
      this.cityRepository.find({
        where: {
          stateId,
        },
      }),
    );
  }
}
