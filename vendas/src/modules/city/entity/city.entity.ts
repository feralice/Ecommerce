import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "user" })
export class CityEntity {
  @PrimaryGeneratedColumn("rowid")
  id: number;

  @Column({ name: "state_id", nullable: false })
  state_id: number;

  @Column({ name: "name", nullable: false })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
