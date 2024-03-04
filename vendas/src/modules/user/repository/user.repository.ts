import { CreateUserDto } from "@/modules/user/dto/request/create-user.dto";
import { UserEntity } from "@/modules/user/entity/user.entity";
import { EntityManager, Repository } from "typeorm";
import { UserType } from "../enum/user-type.enum";
import { Injectable } from "@nestjs/common";
import { hash } from "bcrypt";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(manager: EntityManager) {
    super(UserEntity, manager);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    return await this.save({
      ...createUserDto,
      typeUser: UserType.User,
      password: passwordHashed,
    });
  }

  async findUserById(userId: number): Promise<UserEntity> {
    return await this.findOne({
      where: {
        id: userId,
      },
    });
  }

  async getUserByIdUsingReferences(userId: number): Promise<UserEntity> {
    return await this.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  async findUserByEmail(userEmail: string): Promise<UserEntity> {
    return await this.findOne({
      where: {
        email: userEmail,
      },
    });
  }
}
