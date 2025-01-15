import { CartProductRepository } from "@/modules/cart-product/infrastructure/cart-product.repository";
import { Injectable } from "@nestjs/common";
import { DeleteResult } from "typeorm";

@Injectable()
export class DeleteCartProductService {
  constructor(private readonly cartProductRepository: CartProductRepository) {}

  async execute(productId: number, cartId: number): Promise<DeleteResult> {
    return await this.cartProductRepository.deleteProductInCart(
      productId,
      cartId,
    );
  }
}
