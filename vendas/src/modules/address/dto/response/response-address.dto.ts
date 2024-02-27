import { CityResponseDto } from "@/modules/city/dto/city-response.dto";
import { AddressEntity } from "@/modules/address/entity/address.entity";

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
