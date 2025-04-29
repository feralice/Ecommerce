import { UserResponseDto } from "@/modules/user/application/dto/response/user-response.dto";
import { ReturnLoginDto } from "@/modules/auth/application/dto/return-login.dto";
import { LoginPayload } from "@/modules/auth/application/dto/login-payload.dto";
import { UserService } from "@/modules/user/domain/service/user.service";
import { UserEntity } from "@/modules/user/domain/entity/user.entity";
import { LoginDto } from "@/modules/auth/application/dto/login.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { validatePassword } from "@/utils/password";
import { JwtService } from "@nestjs/jwt";

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

    const isMatch = await validatePassword(
      loginDto.password,
      user?.password || "",
    );

    if (!user || !isMatch) {
      throw new NotFoundException(`Email or password invalid!!!`);
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new UserResponseDto(user),
    };
  }
}
