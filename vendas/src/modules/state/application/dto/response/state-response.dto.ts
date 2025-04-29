import { STATE } from "@/modules/state/application/constant/state.constant";
import { StateEntity } from "@/modules/state/domain/entity/state.entity";
import { ApiProperty } from "@nestjs/swagger";

export class StateResponseDto {
  @ApiProperty({
    description: STATE.DTO.STATE_RESPONSE.NAME.DESCRIPTION,
    example: STATE.DTO.STATE_RESPONSE.NAME.EXAMPLE,
  })
  name: string;

  constructor(state: StateEntity) {
    this.name = state.name;
  }
}
