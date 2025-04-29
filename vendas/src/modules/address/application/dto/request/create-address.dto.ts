import { ADDRESS } from "@/modules/address/application/constants/address.constant";
import { IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressDto {
  @ApiProperty({
    description: ADDRESS.DTO.CREATE_ADDRESS.COMPLEMENT.DESCRIPTION,
    example: ADDRESS.DTO.CREATE_ADDRESS.COMPLEMENT.EXAMPLE,
    required: false,
  })
  @IsString()
  @IsOptional()
  complement: string;

  @ApiProperty({
    description: ADDRESS.DTO.CREATE_ADDRESS.NUMBER.DESCRIPTION,
    example: ADDRESS.DTO.CREATE_ADDRESS.NUMBER.EXAMPLE,
  })
  @IsInt()
  number: number;

  @ApiProperty({
    description: ADDRESS.DTO.CREATE_ADDRESS.CEP.DESCRIPTION,
    example: ADDRESS.DTO.CREATE_ADDRESS.CEP.EXAMPLE,
  })
  @IsString()
  cep: string;

  @ApiProperty({
    description: ADDRESS.DTO.CREATE_ADDRESS.CITY_ID.DESCRIPTION,
    example: ADDRESS.DTO.CREATE_ADDRESS.CITY_ID.EXAMPLE,
  })
  @IsInt()
  cityId: number;
}
