import { AddressModule } from "@/modules/address/address.module";
import { StateModule } from "@/modules/state/state.module";
import { CityModule } from "@/modules/city/city.module";
import { UserModule } from "@/modules/user/user.module";
import typeOrmConfig from "@/config/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    StateModule,
    CityModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
