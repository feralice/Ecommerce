import { StateResponseDto } from "@/modules/state/dto/response/state-response.dto";
import { CityEntity } from "@/modules/city/domain/entity/city.entity";

export class CityResponseDto {
  name: string;
  state?: StateResponseDto;

  constructor(city: CityEntity) {
    this.name = city.name;
    this.state = city.state ? new StateResponseDto(city.state) : undefined;
  }
}
