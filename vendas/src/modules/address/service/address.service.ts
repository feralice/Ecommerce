import { CreateAddressDto } from "@/modules/address/dto/request/create-address.dto";
import { AddressRepository } from "@/modules/address/repository/address.repository";
import { AddressEntity } from "@/modules/address/entity/address.entity";
import { CityService } from "@/modules/city/service/city.service";
import { UserService } from "@/modules/user/service/user.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
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
