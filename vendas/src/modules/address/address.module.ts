import { AddressService } from "@/modules/address/service/address.service";
import { AddressController } from "@/modules/address/address.controller";
import { AddressEntity } from "@/modules/address/entity/address.entity";
import { CityModule } from "@/modules/city/city.module";
import { UserModule } from "@/modules/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), UserModule, CityModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
