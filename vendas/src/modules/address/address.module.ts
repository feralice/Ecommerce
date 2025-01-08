import { AddressRepository } from "@/modules/address/infrastructure/repository/address.repository";
import { AddressController } from "@/modules/address/application/address.controller";
import { AddressService } from "@/modules/address/domain/service/address.service";
import { AddressEntity } from "@/modules/address/domain/entity/address.entity";
import { CityModule } from "@/modules/city/city.module";
import { UserModule } from "@/modules/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), UserModule, CityModule],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository],
})
export class AddressModule {}
