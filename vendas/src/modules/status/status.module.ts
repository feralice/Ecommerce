import { PaymentStatusEntity } from "@/modules/status/domain/entity/status.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatusEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class StatusModule {}
