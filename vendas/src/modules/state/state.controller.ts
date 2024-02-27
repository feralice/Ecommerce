import { StateService } from "@/modules/state/service/state.service";
import { StateEntity } from "@/modules/state/entity/state.entity";
import { Controller, Get } from "@nestjs/common";

@Controller("state")
export class StateController {
  constructor(private readonly stateService: StateService) {}
  @Get()
  async getAllState(): Promise<StateEntity[]> {
    return this.stateService.getAllState();
  }
}
