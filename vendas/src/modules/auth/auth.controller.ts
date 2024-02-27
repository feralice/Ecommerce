import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ReturnLoginDto } from "@/modules/auth/dto/return-login.dto";
import { AuthService } from "@/modules/auth/service/auth.service";
import { LoginDto } from "@/modules/auth/dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
    return await this.authService.login(loginDto);
  }
}
