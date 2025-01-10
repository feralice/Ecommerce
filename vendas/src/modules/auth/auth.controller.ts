import { ReturnLoginDto } from "@/modules/auth/dto/return-login.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "@/modules/auth/service/auth.service";
import { LoginDto } from "@/modules/auth/dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
    return await this.authService.login(loginDto);
  }
}
