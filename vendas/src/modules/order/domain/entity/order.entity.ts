import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderProductEntity } from "@/modules/order-product/domain/entity/order-product.entity";
import { PaymentEntity } from "@/modules/payment/domain/entities/payment.entity";
import { AddressEntity } from "@/modules/address/domain/entity/address.entity";
import { UserEntity } from "@/modules/user/domain/entity/user.entity";

@Entity({ name: "order" })
export class OrderEntity {
  @PrimaryGeneratedColumn("rowid")
  id: number;

  @Column({ name: "user_id", nullable: false })
  userId: number;

  @Column({ name: "address_id", nullable: false })
  addressId: number;

  @Column({ name: "date", nullable: false })
  date: Date;

  @Column({ name: "payment_id", nullable: false })
  paymentId: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user?: UserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.orders)
  @JoinColumn({ name: "address_id", referencedColumnName: "id" })
  address?: AddressEntity;

  @ManyToOne(() => PaymentEntity, (payment) => payment.orders)
  @JoinColumn({ name: "payment_id", referencedColumnName: "id" })
  payment?: PaymentEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
  ordersProduct?: OrderProductEntity[];

  amountProducts?: number;
}
