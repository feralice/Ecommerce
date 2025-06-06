import { CreateOrderDTO } from "@/modules/order/application/dto/create-order.dto";
import { PaymentEntity } from "./payment.entity";
import { ChildEntity, Column } from "typeorm";

@ChildEntity()
export class PaymentPixEntity extends PaymentEntity {
  @Column({ name: "code", nullable: false })
  code: string;

  @Column({ name: "date_payment", nullable: false })
  datePayment: Date;

  constructor(
    statusId: number,
    price: number,
    discount: number,
    finalPrice: number,
    createOrderDTO: CreateOrderDTO,
  ) {
    super(statusId, price, discount, finalPrice);
    this.code = createOrderDTO?.codePix || "";
    this.datePayment = new Date(createOrderDTO?.datePayment || "");
  }
}
