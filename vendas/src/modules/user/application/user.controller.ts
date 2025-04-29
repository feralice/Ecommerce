import { UpdatePasswordDto } from "@/modules/user/application/dto/request/update-password.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UserResponseDto } from "@/modules/user/application/dto/response/user-response.dto";
import { CreateUserDto } from "@/modules/user/application/dto/request/create-user.dto";
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { USER } from "@/modules/user/application/constant/user.constant";
import { UserService } from "@/modules/user/domain/service/user.service";
import { UserEntity } from "@/modules/user/domain/entity/user.entity";
import { UserId } from "@/decorators/user-id.decorator";

@ApiTags(USER.TAG)
@ApiBearerAuth()
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: USER.CREATE.SUMMARY,
    description: USER.CREATE.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: USER.CREATE.RESPONSE_DESCRIPTION,
    type: UserEntity,
  })
  async createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Get()
  @ApiOperation({
    summary: USER.FIND_ALL.SUMMARY,
    description: USER.FIND_ALL.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER.FIND_ALL.RESPONSE_DESCRIPTION,
    type: [UserResponseDto],
  })
  async getAllUsers(): Promise<UserResponseDto[]> {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new UserResponseDto(userEntity),
    );
  }

  @Get("/:userId")
  @ApiOperation({
    summary: USER.FIND_BY_ID.SUMMARY,
    description: USER.FIND_BY_ID.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER.FIND_BY_ID.RESPONSE_DESCRIPTION,
    type: UserResponseDto,
  })
  async getUserById(@Param("userId") userId: number): Promise<UserResponseDto> {
    return new UserResponseDto(
      await this.userService.getUserByIdUsingReferences(userId),
    );
  }

  @Patch("/change-password")
  @ApiOperation({
    summary: USER.CHANGE_PASSWORD.SUMMARY,
    description: USER.CHANGE_PASSWORD.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: USER.CHANGE_PASSWORD.RESPONSE_DESCRIPTION,
    type: UserEntity,
  })
  async updateUserPassword(
    @UserId() userId: number,
    @Body() updatePassword: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return await this.userService.updatePassportUser(userId, updatePassword);
  }
}
