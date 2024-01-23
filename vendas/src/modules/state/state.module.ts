import { StateController } from "./state.controller";
import { StateEntity } from "./entity/state.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StateService } from "./state.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
