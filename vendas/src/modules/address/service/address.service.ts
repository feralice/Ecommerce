import { AddressEntity } from "@/modules/address/entity/address.entity";
import { CreateAddressDto } from "../dto/request/create-address.dto";
import { CityService } from "../../city/service/city.service";
import { UserService } from "../../user/service/user.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
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
}
