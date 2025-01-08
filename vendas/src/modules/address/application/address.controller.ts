import { Roles } from "@/decorators/roles.decorator";
import { UserId } from "@/decorators/user-id.decorator";
import { CreateAddressDto } from "@/modules/address/application/dto/request/create-address.dto";
import { AddressResponseDto } from "@/modules/address/application/dto/response/response-address.dto";
import { AddressEntity } from "@/modules/address/domain/entity/address.entity";
import { AddressService } from "@/modules/address/domain/service/address.service";
import { UserType } from "@/modules/user/application/enum/user-type.enum";
import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";

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
