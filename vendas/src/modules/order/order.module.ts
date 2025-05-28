import { OrderRepository } from "@/modules/order/infrastructure/repository/order.repository";
import { CreateOrderService } from "@/modules/order/domain/use-cases/create-order.service";
import { OrderController } from "@/modules/order/application/order.controller";
import { OrderEntity } from "@/modules/order/domain/entity/order.entity";
import { PaymentModule } from "@/modules/payment/payment.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CartModule } from "@/modules/cart/cart.module";
import { ProductModule } from "@/modules/product/product.module";

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), PaymentModule, CartModule,ProductModule],
  controllers: [OrderController],
  providers: [CreateOrderService, OrderRepository],
  exports: [],
})
export class OrderModule {}
