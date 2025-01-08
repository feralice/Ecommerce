import { StateController } from "@/modules/state/application/state.controller";
import { StateEntity } from "@/modules/state/domain/entity/state.entity";
import { StateService } from "@/modules/state/domain/service/state.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
