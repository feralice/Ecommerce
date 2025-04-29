import { AddressResponseDto } from "@/modules/address/application/dto/response/response-address.dto";
import { USER } from "@/modules/user/application/constant/user.constant";
import { UserEntity } from "@/modules/user/domain/entity/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({
    description: USER.DTO.USER_RESPONSE.ID.DESCRIPTION,
    example: USER.DTO.USER_RESPONSE.ID.EXAMPLE,
  })
  id: number;

  @ApiProperty({
    description: USER.DTO.USER_RESPONSE.NAME.DESCRIPTION,
    example: USER.DTO.USER_RESPONSE.NAME.EXAMPLE,
  })
  name: string;

  @ApiProperty({
    description: USER.DTO.USER_RESPONSE.EMAIL.DESCRIPTION,
    example: USER.DTO.USER_RESPONSE.EMAIL.EXAMPLE,
  })
  email: string;

  @ApiProperty({
    description: USER.DTO.USER_RESPONSE.PHONE.DESCRIPTION,
    example: USER.DTO.USER_RESPONSE.PHONE.EXAMPLE,
  })
  phone: string;

  @ApiProperty({
    description: USER.DTO.USER_RESPONSE.CPF.DESCRIPTION,
    example: USER.DTO.USER_RESPONSE.CPF.EXAMPLE,
  })
  cpf: string;

  @ApiProperty({
    description: USER.DTO.USER_RESPONSE.ADDRESSES.DESCRIPTION,
    type: [AddressResponseDto],
    required: false,
  })
  addresses?: AddressResponseDto[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
    this.addresses = userEntity.addresses
      ? userEntity.addresses.map((address) => new AddressResponseDto(address))
      : undefined;
  }
}
