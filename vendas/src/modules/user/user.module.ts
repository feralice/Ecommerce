import { UserService } from "@/modules/user/service/user.service";
import { UserController } from "@/modules/user/user.controller";
import { UserEntity } from "@/modules/user/entity/user.entity";
import { UserRepository } from "./repository/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
