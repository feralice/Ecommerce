import { CityEntity } from "@/modules/city/domain/entity/city.entity";
import { EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CityRepository extends Repository<CityEntity> {
  constructor(manager: EntityManager) {
    super(CityEntity, manager);
  }
  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return await this.find({
      where: {
        stateId,
      },
    });
  }

  async findCityById(cityId: number): Promise<CityEntity> {
    return await this.findOne({
      where: {
        id: cityId,
      },
    });
  }
}
