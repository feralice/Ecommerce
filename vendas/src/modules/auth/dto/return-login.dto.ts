import { UserResponseDto } from "@/modules/user/dto/response/user-response.dto";

export class ReturnLoginDto {
  user: UserResponseDto;
  accessToken: string;
}
