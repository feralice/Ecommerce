import { ReturnLoginDto } from "@/modules/auth/application/dto/return-login.dto";
import { AUTH } from "@/modules/auth/application/constant/auth.constant";
import { AuthService } from "@/modules/auth/domain/service/auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "@/modules/auth/application/dto/login.dto";
import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
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
