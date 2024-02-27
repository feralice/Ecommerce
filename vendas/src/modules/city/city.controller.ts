import { CityService } from "@/modules/city/service/city.service";
import { CityEntity } from "@/modules/city/entity/city.entity";
import { Controller, Get, Param } from "@nestjs/common";

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
