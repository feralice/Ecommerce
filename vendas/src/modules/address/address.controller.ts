import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateAddressDto } from "./dto/request/create-address.dto";
import { AddressService } from "./service/address.service";
import { UserId } from "@/decorators/user-id.decorator";
import { AddressEntity } from "./entity/address.entity";
import { UserType } from "../user/enum/user-type.enum";
import { Roles } from "@/decorators/roles.decorator";

@Roles(UserType.User)
@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddress: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddress, userId);
  }
}
