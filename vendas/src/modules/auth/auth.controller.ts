import { ReturnLoginDto } from "@/modules/auth/dto/return-login.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "@/modules/auth/service/auth.service";
import { AUTH } from "@/modules/auth/constant/auth.constant";
import { LoginDto } from "@/modules/auth/dto/login.dto";
@ApiTags(AUTH.TAG)
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: AUTH.LOGIN.SUMMARY,
    description: AUTH.LOGIN.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AUTH.LOGIN.RESPONSE_DESCRIPTION,
    type: ReturnLoginDto,
  })
  async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
    return await this.authService.login(loginDto);
  }
}
