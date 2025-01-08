import { CreateAddressDto } from "@/modules/address/application/dto/request/create-address.dto";

export const createAddressDto = (): CreateAddressDto => {
  return {
    cep: "12345-678",
    cityId: 1,
    complement: "Apt 123",
    number: 456,
  };
};
