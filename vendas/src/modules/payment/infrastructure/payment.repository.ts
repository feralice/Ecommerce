import { PaymentCreditCardEntity } from "@/modules/payment/domain/entities/payment-credit-card.entity";
import { PaymentPixEntity } from "@/modules/payment/domain/entities/payment-pix.entity";
import { PaymentEntity } from "@/modules/payment/domain/entities/payment.entity";
import { EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PaymentRepository extends Repository<PaymentEntity> {
  constructor(manager: EntityManager) {
    super(PaymentEntity, manager);
  }

  async createPixPayment(payment: PaymentPixEntity): Promise<PaymentEntity> {
    return this.save(payment);
  }

  async createCreditCardPayment(
    payment: PaymentCreditCardEntity,
  ): Promise<PaymentEntity> {
    return this.save(payment);
  }
}
