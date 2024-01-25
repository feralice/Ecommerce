import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateAddressDto } from "./dto/request/create-address.dto";
import { AddressEntity } from "./entity/address.entity";
import { AddressService } from "./address.service";

@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post("/:userId")
  @UsePipes(ValidationPipe)
  async createAddress(
    @Param("userId") userId: number,
    @Body() createAddress: CreateAddressDto,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddress, userId);
  }
}
