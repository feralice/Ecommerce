import { AddressResponseDto } from "@/modules/address/dto/response/response-address.dto";
import { UserEntity } from "@/modules/user/entity/user.entity";

export class UserDtoResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
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
