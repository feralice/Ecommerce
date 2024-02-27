import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CategoryEntity } from "@/modules/category/entity/category.entity";

@Entity({ name: "product" })
export class ProductEntity {
  @PrimaryGeneratedColumn("rowid")
  id: number;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "category_id", nullable: false })
  categoryId: string;

  @Column({ name: "price", nullable: false })
  price: number;

  @Column({ name: "image", nullable: false })
  image: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: "category_id", referencedColumnName: "id" })
  category?: CategoryEntity;
}
