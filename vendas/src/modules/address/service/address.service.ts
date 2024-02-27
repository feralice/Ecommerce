import { AddressEntity } from "@/modules/address/entity/address.entity";
import { CreateAddressDto } from "../dto/request/create-address.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CityService } from "../../city/service/city.service";
import { UserService } from "../../user/service/user.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(
    createAddress: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(createAddress.cityId);
    return this.addressRepository.save({ ...createAddress, userId });
  }

  async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    const addresses = await this.addressRepository.find({
      where: {
        userId,
      },
      relations: {
        city: {
          state: true,
        },
      },
    });
    if (!addresses || addresses.length === 0) {
      throw new NotFoundException("Address not found!");
    }
    return addresses;
  }
}
