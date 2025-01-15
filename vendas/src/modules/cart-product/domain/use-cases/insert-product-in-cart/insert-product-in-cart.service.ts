import { CartProductRepository } from "@/modules/cart-product/infrastructure/cart-product.repository";
import { CartProductEntity } from "@/modules/cart-product/domain/cart-product.entity";
import { ProductService } from "@/modules/product/domain/service/product.service";
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { Injectable } from "@nestjs/common";
import { InsertCartDTO } from "@/modules/cart/application/dto/cart.dto";

@Injectable()
export class UpdateProductInCartService {
  constructor(
    private readonly cartProductRepository: CartProductRepository,
    private readonly productService: ProductService,
  ) {}

  async insertProductInCart(
    insertCartDTO: InsertCartDTO,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    await this.productService.findProductById(insertCartDTO.productId);

    const cartProduct = await this.cartProductRepository
      .verifyProductInCart(insertCartDTO.productId, cart.id)
      .catch(() => undefined);

    if (!cartProduct) {
      return this.cartProductRepository.createProductInCart(
        insertCartDTO,
        cart.id,
      );
    }

    return this.cartProductRepository.updateProductAmount(
      cartProduct,
      insertCartDTO.amount,
    );
  }
}
