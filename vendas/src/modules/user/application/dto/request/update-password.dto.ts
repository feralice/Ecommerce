import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { USER } from "@/modules/user/application/constant/user.constant";

export class UpdatePasswordDto {
  @ApiProperty({
    description: USER.DTO.UPDATE_PASSWORD.OLD_PASSWORD.DESCRIPTION,
    example: USER.DTO.UPDATE_PASSWORD.OLD_PASSWORD.EXAMPLE,
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: USER.DTO.UPDATE_PASSWORD.NEW_PASSWORD.DESCRIPTION,
    example: USER.DTO.UPDATE_PASSWORD.NEW_PASSWORD.EXAMPLE,
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
