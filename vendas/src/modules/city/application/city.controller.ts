import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CITY } from "@/modules/city/application/constants/city.constant";
import { CityService } from "@/modules/city/domain/service/city.service";
import { CityEntity } from "@/modules/city/domain/entity/city.entity";
import { Controller, Get, HttpStatus, Param } from "@nestjs/common";

@ApiTags(CITY.TAG)
@ApiBearerAuth()
@Controller("city")
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get("/:stateId")
  @ApiOperation({
    summary: CITY.FIND_BY_STATE_ID.SUMMARY,
    description: CITY.FIND_BY_STATE_ID.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CITY.FIND_BY_STATE_ID.RESPONSE_DESCRIPTION,
    type: [CityEntity],
  })
  async getAllCitiesByStateId(
    @Param("stateId") stateId: number,
  ): Promise<CityEntity[]> {
    return this.cityService.getAllCitiesByStateId(stateId);
  }
}
