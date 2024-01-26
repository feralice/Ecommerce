import { AddressEntity } from "../../entity/address.entity";

export class AddressResponseDto {
  complement: string;
  number: number;
  cep: string;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.number = address.number;
    this.cep = address.cep;
  }
}
