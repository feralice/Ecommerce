import { DeleteResult, EntityManager, Repository } from "typeorm";
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CartRepository extends Repository<CartEntity> {
  constructor(manager: EntityManager) {
    super(CartEntity, manager);
  }

  async verifyCartExists(
    userId: number,
    isRelations?: boolean,
  ): Promise<CartEntity> {
    const relations = isRelations
      ? {
          cartProduct: {
            product: true,
          },
        }
      : undefined;
    return await this.findOne({
      where: {
        userId,
        active: true,
      },
      relations,
    });
  }

  async createCart(userId: number): Promise<CartEntity> {
    return await this.save({
      userId,
      active: true,
    });
  }

  async clearCart(cart: CartEntity): Promise<DeleteResult> {
    //apenas desativando para deixar histórico
    await this.save({
      ...cart,
      active: false,
    });
    return {
      raw: {},
      affected: 1,
    };
  }
}
