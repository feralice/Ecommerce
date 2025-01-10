import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CartRepository extends Repository<CartEntity> {
  constructor(manager: EntityManager) {
    super(CartEntity, manager);
  }

  async verifyCartExists(userId: number): Promise<CartEntity> {
    return await this.findOne({
      where: {
        userId,
        active: true,
      },
    });
  }

  async createCart(userId: number): Promise<CartEntity> {
    return await this.save({
      userId,
      active: true,
    });
  }

  
}
