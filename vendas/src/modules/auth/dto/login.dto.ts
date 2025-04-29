import { AUTH } from "@/modules/auth/constant/auth.constant";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: AUTH.DTO.LOGIN.EMAIL.DESCRIPTION,
    example: AUTH.DTO.LOGIN.EMAIL.EXAMPLE,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: AUTH.DTO.LOGIN.PASSWORD.DESCRIPTION,
    example: AUTH.DTO.LOGIN.PASSWORD.EXAMPLE,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
