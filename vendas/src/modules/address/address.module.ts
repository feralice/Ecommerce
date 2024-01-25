import { AddressController } from "./address.controller";
import { AddressEntity } from "./entity/address.entity";
import { AddressService } from "./address.service";
import { CityModule } from "../city/city.module";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), UserModule, CityModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
