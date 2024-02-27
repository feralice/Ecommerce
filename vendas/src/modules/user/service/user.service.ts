import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { CreateUserDto } from "@/modules/user/dto/request/create-user.dto";
import { UserRepository } from "@/modules/user/repository/user.repository";
import { UserEntity } from "@/modules/user/entity/user.entity";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    await this.findUserByEmail(createUserDto.email);
    try {
      return await this.userRepository.createUser(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException("Error creating user!");
    }
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(userId: number): Promise<UserEntity> {
    try {
      return await this.userRepository.findUserById(userId);
    } catch (error) {
      throw new NotFoundException(`User with userId: ${userId} not found!`);
    }
  }

  async getUserByIdUsingReferences(userId: number): Promise<UserEntity> {
    try {
      return await this.userRepository.getUserByIdUsingReferences(userId);
    } catch (error) {
      throw new NotFoundException(`User with userId: ${userId} not found!`);
    }
  }

  async findUserByEmail(userEmail: string): Promise<UserEntity> {
    let user: UserEntity;

    try {
      user = await this.userRepository.findUserByEmail(userEmail);
    } catch (error) {
      throw new InternalServerErrorException("Error finding user by email!");
    }

    if (user) {
      throw new UnprocessableEntityException(
        `User with email: ${userEmail} already exists!`,
      );
    } else {
      return null;
    }
  }
}
