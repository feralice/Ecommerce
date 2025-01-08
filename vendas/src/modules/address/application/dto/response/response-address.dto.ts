import { AddressEntity } from "@/modules/address/domain/entity/address.entity";
import { CityResponseDto } from "@/modules/city/application/dto/city-response.dto";

export class AddressResponseDto {
  complement: string;
  number: number;
  cep: string;
  city?: CityResponseDto;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.number = address.number;
    this.cep = address.cep;
    this.city = address.city ? new CityResponseDto(address.city) : undefined;
  }
}
