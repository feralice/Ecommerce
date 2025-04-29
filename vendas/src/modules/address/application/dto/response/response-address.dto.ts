import { CityResponseDto } from "@/modules/city/application/dto/city-response.dto";
import { AddressEntity } from "@/modules/address/domain/entity/address.entity";
import { ADDRESS } from "@/modules/address/application/constants/address.constant";
import { ApiProperty } from "@nestjs/swagger";

export class AddressResponseDto {
  @ApiProperty({
    description: ADDRESS.DTO.ADDRESS_RESPONSE.COMPLEMENT.DESCRIPTION,
    example: ADDRESS.DTO.ADDRESS_RESPONSE.COMPLEMENT.EXAMPLE,
  })
  complement: string;

  @ApiProperty({
    description: ADDRESS.DTO.ADDRESS_RESPONSE.NUMBER.DESCRIPTION,
    example: ADDRESS.DTO.ADDRESS_RESPONSE.NUMBER.EXAMPLE,
  })
  number: number;

  @ApiProperty({
    description: ADDRESS.DTO.ADDRESS_RESPONSE.CEP.DESCRIPTION,
    example: ADDRESS.DTO.ADDRESS_RESPONSE.CEP.EXAMPLE,
  })
  cep: string;

  @ApiProperty({
    description: ADDRESS.DTO.ADDRESS_RESPONSE.CITY.DESCRIPTION,
    type: () => CityResponseDto,
    required: false,
  })
  city?: CityResponseDto;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.number = address.number;
    this.cep = address.cep;
    this.city = address.city ? new CityResponseDto(address.city) : undefined;
  }
}
