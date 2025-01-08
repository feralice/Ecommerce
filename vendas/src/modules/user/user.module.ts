import { UserController } from "@/modules/user/application/user.controller";
import { UserEntity } from "@/modules/user/domain/entity/user.entity";
import { UserService } from "@/modules/user/domain/service/user.service";
import { UserRepository } from "@/modules/user/infrastructure/repository/user.repository";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
