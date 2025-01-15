import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartProductEntity } from "@/modules/cart-product/domain/cart-product.entity";

@Entity({ name: "cart" })
export class CartEntity {
  @PrimaryGeneratedColumn("rowid")
  id: number;

  @Column({ name: "user_id", nullable: false })
  userId: number;

  @Column({ name: "active", nullable: false })
  active: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.cart)
  cartProduct?: CartProductEntity[];
}
