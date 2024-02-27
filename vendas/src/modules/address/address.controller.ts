import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AddressResponseDto } from "./dto/response/response-address.dto";
import { CreateAddressDto } from "./dto/request/create-address.dto";
import { AddressService } from "./service/address.service";
import { UserId } from "@/decorators/user-id.decorator";
import { AddressEntity } from "./entity/address.entity";
import { UserType } from "../user/enum/user-type.enum";
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
    return (await this.addressService.findAddressByUserId(userId)).map(
      (address) => new AddressResponseDto(address),
    );
  }
}
