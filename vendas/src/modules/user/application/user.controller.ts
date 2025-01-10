import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UpdatePasswordDto } from "@/modules/user/application/dto/request/update-password.dto";
import { UserResponseDto } from "@/modules/user/application/dto/response/user-response.dto";
import { CreateUserDto } from "@/modules/user/application/dto/request/create-user.dto";
import { UserService } from "@/modules/user/domain/service/user.service";
import { UserEntity } from "@/modules/user/domain/entity/user.entity";
import { UserId } from "@/decorators/user-id.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  async updateUserPassword(
    @UserId() userId: number,
    @Body() updatePassword: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return await this.userService.updatePassportUser(userId, updatePassword);
  }
}
