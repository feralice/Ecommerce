import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./interface/user.interface";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
