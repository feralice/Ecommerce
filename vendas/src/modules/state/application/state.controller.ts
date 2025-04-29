import { StateResponseDto } from "@/modules/state/application/dto/response/state-response.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { STATE } from "@/modules/state/application/constant/state.constant";
import { StateService } from "@/modules/state/domain/service/state.service";
import { StateEntity } from "@/modules/state/domain/entity/state.entity";
import { Controller, Get, HttpStatus } from "@nestjs/common";

@ApiTags(STATE.TAG)
@ApiBearerAuth()
@Controller("state")
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  @ApiOperation({
    summary: STATE.FIND_ALL.SUMMARY,
    description: STATE.FIND_ALL.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: STATE.FIND_ALL.RESPONSE_DESCRIPTION,
    type: [StateResponseDto],
  })
  async getAllState(): Promise<StateEntity[]> {
    return this.stateService.getAllState();
  }
}
