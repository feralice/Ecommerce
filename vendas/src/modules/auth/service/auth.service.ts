import { LoginPayload } from "@/modules/auth/dto/login-payload.dto";
import { LoginDto } from "@/modules/auth/dto/login.dto";
import { ReturnLoginDto } from "@/modules/auth/dto/return-login.dto";
import { UserResponseDto } from "@/modules/user/application/dto/response/user-response.dto";
import { UserEntity } from "@/modules/user/domain/entity/user.entity";
import { UserService } from "@/modules/user/domain/service/user.service";
import { validatePassword } from "@/utils/password";
import { Injectable, NotFoundException } from "@nestjs/common";
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
