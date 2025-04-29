import { StateResponseDto } from "@/modules/state/application/dto/response/state-response.dto";
import { CITY } from "@/modules/city/application/constants/city.constant";
import { CityEntity } from "@/modules/city/domain/entity/city.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CityResponseDto {
  @ApiProperty({
    description: CITY.DTO.CITY_RESPONSE.NAME.DESCRIPTION,
    example: CITY.DTO.CITY_RESPONSE.NAME.EXAMPLE,
  })
  name: string;

  @ApiProperty({
    description: CITY.DTO.CITY_RESPONSE.STATE.DESCRIPTION,
    type: () => StateResponseDto,
    required: false,
  })
  state?: StateResponseDto;

  constructor(city: CityEntity) {
    this.name = city.name;
    this.state = city.state ? new StateResponseDto(city.state) : undefined;
  }
}
