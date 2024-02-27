import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AddressResponseDto } from "@/modules/address/dto/response/response-address.dto";
import { CreateAddressDto } from "@/modules/address/dto/request/create-address.dto";
import { AddressService } from "@/modules/address/service/address.service";
import { AddressEntity } from "@/modules/address/entity/address.entity";
import { UserType } from "@/modules/user/enum/user-type.enum";
import { UserId } from "@/decorators/user-id.decorator";
import { Roles } from "@/decorators/roles.decorator";

@Roles(UserType.User, UserType.Admin)
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

  @Get()
  async findAddressByUserId(
    @UserId() userId: number,
  ): Promise<AddressResponseDto[]> {
    return await this.addressService.findAddressByUserId(userId);
  }
}
