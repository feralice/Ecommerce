import { CityEntity } from "@/modules/city/entity/city.entity";
import { Repository } from "typeorm";

export class CityRepository extends Repository<CityEntity> {
  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return this.find({
      where: {
        stateId,
      },
    });
  }

  async findCityById(cityId: number): Promise<CityEntity> {
    return this.findOne({
      where: {
        id: cityId,
      },
    });
  }
}
