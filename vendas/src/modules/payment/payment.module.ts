import { CalculateFinalPriceService } from "@/modules/payment/domain/use-case/calculate-final-price/calculate-final-price.service";
import { CreatePaymentService } from "@/modules/payment/domain/use-case/create-payment/create-payment.service";
import { PaymentEntity } from "@/modules/payment/domain/entities/payment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  controllers: [],
  providers: [CreatePaymentService, CalculateFinalPriceService],
  exports: [CreatePaymentService, CalculateFinalPriceService],
})
export class PaymentModule {}
