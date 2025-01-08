import { UserResponseDto } from "@/modules/user/application/dto/response/user-response.dto";

export class ReturnLoginDto {
  user: UserResponseDto;
  accessToken: string;
}
