import { CityRepository } from "@/modules/city/infrastructure/repository/city.repository";
import { CityEntity } from "@/modules/city/domain/entity/city.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CacheService } from "@/config/cache/cache.service";

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
      throw new NotFoundException(`City with cityId ${cityId} is not found!!`);
    }
  }
}
