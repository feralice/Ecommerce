import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./interface/user.interface";
import { Injectable } from "@nestjs/common";
import { hash } from "bcrypt";

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
      password: passwordHashed,
    };

    this.users.push(user);
    console.log(passwordHashed);

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}
