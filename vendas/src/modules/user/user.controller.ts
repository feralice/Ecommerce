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
import { CreateUserDto } from "@/modules/user/dto/request/create-user.dto";
import { UpdatePasswordDto } from "./dto/request/update-password.dto";
import { UserResponseDto } from "./dto/response/user-response.dto";
import { UserId } from "@/decorators/user-id.decorator";
import { UserService } from "./service/user.service";
import { UserEntity } from "./entity/user.entity";

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
