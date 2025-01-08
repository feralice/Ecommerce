import { AddressRepository } from "@/modules/address/infrastructure/repository/address.repository";
import { CreateAddressDto } from "@/modules/address/application/dto/request/create-address.dto";
import { AddressEntity } from "@/modules/address/domain/entity/address.entity";
import { CityService } from "@/modules/city/domain/service/city.service";
import { UserService } from "@/modules/user/service/user.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class AddressService {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(
    createAddress: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    try {
      await this.userService.findUserById(userId);
      await this.cityService.findCityById(createAddress.cityId);
      return this.addressRepository.createAddress(createAddress, userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    try {
      return await this.addressRepository.findAddressByUserId(userId);
    } catch (error) {
      throw new NotFoundException("Address not found!");
    }
  }
}
