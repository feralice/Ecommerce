import { StateEntity } from "@/modules/state/entity/state.entity";

export class StateResponseDto {
  name: string;

  constructor(state: StateEntity) {
    this.name = state.name;
  }
}
