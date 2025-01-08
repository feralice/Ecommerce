import { UserId } from "@/decorators/user-id.decorator";
import { CreateUserDto } from "@/modules/user/application/dto/request/create-user.dto";
import { UpdatePasswordDto } from "@/modules/user/application/dto/request/update-password.dto";
import { UserResponseDto } from "@/modules/user/application/dto/response/user-response.dto";
import { UserEntity } from "@/modules/user/domain/entity/user.entity";
import { UserService } from "@/modules/user/domain/service/user.service";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new UserResponseDto(userEntity),
    );
  }

  @Get("/:userId")
  async getUserById(@Param("userId") userId: number): Promise<UserResponseDto> {
    return new UserResponseDto(
      await this.userService.getUserByIdUsingReferences(userId),
    );
  }

  @Patch("/change-password")
  @UsePipes(ValidationPipe)
  async updateUserPassword(
    @UserId() userId: number,
    @Body() updatePassword: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return await this.userService.updatePassportUser(userId, updatePassword);
  }
}
