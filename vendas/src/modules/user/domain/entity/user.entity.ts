import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AddressEntity } from "@/modules/address/domain/entity/address.entity";
import { OrderEntity } from "@/modules/order/domain/entity/order.entity";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn("rowid")
  id: number;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "email", nullable: false })
  email: string;

  @Column({ name: "phone" })
  phone: string;

  @Column({ name: "cpf", nullable: false })
  cpf: string;

  @Column({ name: "password", nullable: false })
  password: string;

  @Column({ name: "type_user", nullable: false })
  typeUser: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses?: AddressEntity[];

  @OneToMany(() => OrderEntity, (order) => order.address)
  orders?: OrderEntity[];
}
