import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateUserDto } from "@/modules/user/dto/request/create-user.dto";
import { UserResponseDto } from "./dto/response/user-response.dto";
import { UserService } from "./user.service";

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
}
