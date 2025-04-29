import { AddressResponseDto } from "@/modules/address/application/dto/response/response-address.dto";
import { CreateAddressDto } from "@/modules/address/application/dto/request/create-address.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AddressService } from "@/modules/address/domain/service/address.service";
import { AddressEntity } from "@/modules/address/domain/entity/address.entity";
import { UserType } from "@/modules/user/application/enum/user-type.enum";
import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { ADDRESS } from "@/modules/address/application/constants/address.constant";
import { UserId } from "@/decorators/user-id.decorator";
import { Roles } from "@/decorators/roles.decorator";

@ApiTags(ADDRESS.TAG)
@ApiBearerAuth()
@Roles(UserType.User, UserType.Admin)
@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({
    summary: ADDRESS.CREATE.SUMMARY,
    description: ADDRESS.CREATE.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ADDRESS.CREATE.RESPONSE_DESCRIPTION,
    type: AddressEntity,
  })
  async createAddress(
    @Body() createAddress: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddress, userId);
  }

  @Get()
  @ApiOperation({
    summary: ADDRESS.FIND_BY_USER.SUMMARY,
    description: ADDRESS.FIND_BY_USER.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ADDRESS.FIND_BY_USER.RESPONSE_DESCRIPTION,
    type: [AddressResponseDto],
  })
  async findAddressByUserId(
    @UserId() userId: number,
  ): Promise<AddressResponseDto[]> {
    return await this.addressService.findAddressByUserId(userId);
  }
}
