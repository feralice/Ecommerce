import { AddressResponseDto } from "@/modules/address/application/dto/response/response-address.dto";
import { CreateAddressDto } from "@/modules/address/application/dto/request/create-address.dto";
import { AddressService } from "@/modules/address/domain/service/address.service";
import { AddressEntity } from "@/modules/address/domain/entity/address.entity";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserType } from "@/modules/user/application/enum/user-type.enum";
import { UserId } from "@/decorators/user-id.decorator";
import { Roles } from "@/decorators/roles.decorator";

@Roles(UserType.User, UserType.Admin)
@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async createAddress(
    @Body() createAddress: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddress, userId);
  }

  @Get()
  async findAddressByUserId(
    @UserId() userId: number,
  ): Promise<AddressResponseDto[]> {
    return await this.addressService.findAddressByUserId(userId);
  }
}
