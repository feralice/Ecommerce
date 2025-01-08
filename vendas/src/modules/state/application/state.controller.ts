import { StateEntity } from "@/modules/state/domain/entity/state.entity";
import { StateService } from "@/modules/state/domain/service/state.service";
import { Controller, Get } from "@nestjs/common";

@Controller("state")
export class StateController {
  constructor(private readonly stateService: StateService) {}
  @Get()
  async getAllState(): Promise<StateEntity[]> {
    return this.stateService.getAllState();
  }
}
