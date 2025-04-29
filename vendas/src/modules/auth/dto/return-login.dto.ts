import { UserResponseDto } from "@/modules/user/application/dto/response/user-response.dto";
import { AUTH } from "@/modules/auth/constant/auth.constant";
import { ApiProperty } from "@nestjs/swagger";

export class ReturnLoginDto {
  @ApiProperty({
    description: AUTH.DTO.RETURN_LOGIN.USER.DESCRIPTION,
    type: () => UserResponseDto,
  })
  user: UserResponseDto;

  @ApiProperty({
    description: AUTH.DTO.RETURN_LOGIN.ACCESS_TOKEN.DESCRIPTION,
    example: AUTH.DTO.RETURN_LOGIN.ACCESS_TOKEN.EXAMPLE,
  })
  accessToken: string;
}
