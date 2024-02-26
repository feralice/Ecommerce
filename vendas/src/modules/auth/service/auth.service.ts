import { UserResponseDto } from "../../user/dto/response/user-response.dto";
import { UserService } from "@/modules/user/service/user.service";
import { UserEntity } from "@/modules/user/entity/user.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ReturnLoginDto } from "../dto/return-login.dto";
import { LoginPayload } from "../dto/login-payload.dto";
import { LoginDto } from "../dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await compare(loginDto.password, user?.password || "");

    if (!user || !isMatch) {
      throw new NotFoundException(`Email or password invalid!!!`);
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new UserResponseDto(user),
    };
  }
}
