import { StateService } from "@/modules/state/service/state.service";
import { StateController } from "@/modules/state/state.controller";
import { StateEntity } from "@/modules/state/entity/state.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
