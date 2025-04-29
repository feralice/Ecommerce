import { USER } from "@/modules/user/application/constant/user.constant";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: USER.DTO.CREATE_USER.NAME.DESCRIPTION,
    example: USER.DTO.CREATE_USER.NAME.EXAMPLE,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: USER.DTO.CREATE_USER.EMAIL.DESCRIPTION,
    example: USER.DTO.CREATE_USER.EMAIL.EXAMPLE,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: USER.DTO.CREATE_USER.PHONE.DESCRIPTION,
    example: USER.DTO.CREATE_USER.PHONE.EXAMPLE,
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: USER.DTO.CREATE_USER.CPF.DESCRIPTION,
    example: USER.DTO.CREATE_USER.CPF.EXAMPLE,
  })
  @IsString()
  cpf: string;

  @ApiProperty({
    description: USER.DTO.CREATE_USER.PASSWORD.DESCRIPTION,
    example: USER.DTO.CREATE_USER.PASSWORD.EXAMPLE,
  })
  @IsString()
  password: string;
}
