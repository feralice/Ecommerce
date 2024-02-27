import { CityRepository } from "@/modules/city/repository/city.repository";
import { CityEntity } from "@/modules/city/entity/city.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CacheService } from "@/config/cache/cache.service";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CityService {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    try {
      return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, () =>
        this.cityRepository.getAllCitiesByStateId(stateId),
      );
    } catch (error) {
      throw new NotFoundException("No cities found!");
    }
  }

  async findCityById(cityId: number): Promise<CityEntity> {
    try {
      return await this.cityRepository.findCityById(cityId);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`City with cityId ${cityId} is not found!!`);
    }
  }
}
