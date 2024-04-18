import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "@/modules/user/dto/request/create-user.dto";
import { UserRepository } from "@/modules/user/repository/user.repository";
import { UpdatePasswordDto } from "../dto/request/update-password.dto";
import { hashPassword, validatePassword } from "@/utils/password";
import { UserEntity } from "@/modules/user/entity/user.entity";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException(
        `User with email: ${createUserDto.email} already exist!`,
      );
    }
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
    try {
      return await this.userRepository.findUserByEmail(userEmail);
    } catch (error) {
      throw new InternalServerErrorException("Error finding user by email!");
    }
  }

  async updatePassportUser(
    userId: number,
    updatePassword: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);
    const newPasswordHashed = await hashPassword(updatePassword.newPassword);

    if (updatePassword.oldPassword === updatePassword.newPassword) {
      throw new BadRequestException(
        "New password must be different from old password!",
      );
    }

    const isOldPasswordCorrect = await validatePassword(
      updatePassword.oldPassword,
      user.password || "",
    );

    if (!isOldPasswordCorrect) {
      throw new UnauthorizedException("Old password is incorrect!");
    }

    try {
      return await this.userRepository.updateUserPassword(
        user,
        newPasswordHashed,
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error updating user!");
    }
  }
}
