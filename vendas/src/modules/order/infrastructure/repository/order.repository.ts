import { CreateOrderDTO } from "@/modules/order/application/dto/create-order.dto";
import { PaymentEntity } from "@/modules/payment/domain/entities/payment.entity";
import { OrderEntity } from "@/modules/order/domain/entity/order.entity";
import { EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(manager: EntityManager) {
    super(OrderEntity, manager);
  }

  async createOrder(
    createOrderDTO: CreateOrderDTO,
    userId: number,
    payment: PaymentEntity,
  ): Promise<OrderEntity> {
    return this.save({
      addressId: createOrderDTO.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });
  }
}
