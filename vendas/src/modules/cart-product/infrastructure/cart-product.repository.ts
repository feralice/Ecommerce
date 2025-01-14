import { CartProductEntity } from "@/modules/cart-product/domain/cart-product.entity";
import { CartRequestDto } from "@/modules/cart/application/dto/cart.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { DeleteResult, EntityManager, Repository } from "typeorm";

@Injectable()
export class CartProductRepository extends Repository<CartProductEntity> {
  constructor(manager: EntityManager) {
    super(CartProductEntity, manager);
  }

  async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.findOne({
      where: {
        productId,
        cartId,
      },
    });

    if (!cartProduct) {
      throw new NotFoundException("Product not found in cart");
    }

    return cartProduct;
  }

  async createProductInCart(
    insertCartDTO: CartRequestDto,
    cartId: number,
  ): Promise<CartProductEntity> {
    return this.save({
      amount: insertCartDTO.amount,
      productId: insertCartDTO.productId,
      cartId,
    });
  }

  async updateProductAmount(
    cartProduct: CartProductEntity,
    additionalAmount: number,
  ): Promise<CartProductEntity> {
    cartProduct.amount += additionalAmount;
    return this.save(cartProduct);
  }

  async deleteProductInCart(productId: number, cartId: number): Promise<DeleteResult> {
    return await this.delete({
      productId,
      cartId,
    });
  }
}
