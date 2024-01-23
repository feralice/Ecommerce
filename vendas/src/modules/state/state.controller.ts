import { StateEntity } from "./entity/state.entity";
import { Controller, Get } from "@nestjs/common";
import { StateService } from "./state.service";

@Controller("state")
export class StateController {
  constructor(private readonly stateService: StateService) {}
  @Get()
  async getAllState(): Promise<StateEntity[]> {
    return this.stateService.getAllState();
  }
}
