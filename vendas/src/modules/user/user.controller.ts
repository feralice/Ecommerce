import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateUserDto } from "@/modules/user/dto/request/create-user.dto";
import { UserDtoResponse } from "./dto/response/user-response.dto";
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
  async getAllUsers(): Promise<UserDtoResponse[]> {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new UserDtoResponse(userEntity),
    );
  }
}
