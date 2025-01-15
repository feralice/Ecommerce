import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CartEntity } from '@/modules/cart/domain/cart.entity';

@Injectable()
export class CartRepository extends Repository<CartEntity> {
  constructor(manager: EntityManager) {
    super(CartEntity, manager);
  }

  async findActiveCartByUserId(userId: number, isRelations = false): Promise<CartEntity | null> {
    const relations = isRelations
      ? {
          cartProduct: {
            product: true,
          },
        }
      : undefined;

    return this.findOne({
      where: { userId, active: true },
      relations,
    });
  }

  async createCart(userId: number): Promise<CartEntity> {
    return this.save({
      userId,
      active: true,
    });
  }

  async deactivateCart(cart: CartEntity): Promise<CartEntity> {
    return this.save({
      ...cart,
      active: false,
    });
  }
}
