import { CreateAddressDto } from "@/modules/address/dto/request/create-address.dto";
import { AddressEntity } from "@/modules/address/entity/address.entity";
import { EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AddressRepository extends Repository<AddressEntity> {
  constructor(manager: EntityManager) {
    super(AddressEntity, manager);
  }
  async createAddress(
    createAddress: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    const address = this.create({ ...createAddress, userId });
    return await this.save(address);
  }

  async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    return await this.find({
      where: {
        userId,
      },
      relations: {
        city: {
          state: true,
        },
      },
    });
  }
}
