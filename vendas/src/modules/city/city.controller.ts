import { Controller, Get, Param } from "@nestjs/common";
import { CityService } from "./service/city.service";
import { CityEntity } from "./entity/city.entity";

@Controller("city")
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get("/:stateId")
  async getAllCitiesByStateId(
    @Param("stateId") stateId: number,
  ): Promise<CityEntity[]> {
    return this.cityService.getAllCitiesByStateId(stateId);
  }
}
