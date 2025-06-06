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
import { OrderEntity } from "@/modules/order/domain/entity/order.entity";
import { CityEntity } from "@/modules/city/domain/entity/city.entity";
import { UserEntity } from "@/modules/user/domain/entity/user.entity";

@Entity({ name: "address" })
export class AddressEntity {
  @PrimaryGeneratedColumn("rowid")
  id: number;

  @Column({ name: "user_id", nullable: false })
  userId: number;

  @Column({ name: "complement", nullable: true })
  complement: string;

  @Column({ name: "number", nullable: false })
  number: number;

  @Column({ name: "cep", nullable: false })
  cep: string;

  @Column({ name: "city_id", nullable: false })
  cityId: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user?: UserEntity;

  @ManyToOne(() => CityEntity, (city) => city.addresses)
  @JoinColumn({ name: "city_id", referencedColumnName: "id" })
  city?: CityEntity;

  @OneToMany(() => OrderEntity, (order) => order.address)
  orders?: OrderEntity[];
}
