import { UpdateProductInCartService } from "@/modules/cart-product/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { DeleteCartProductService } from "@/modules/cart-product/domain/use-cases/delete-product-cart/delete-product-cart.service";
import { CartProductRepository } from "@/modules/cart-product/infrastructure/cart-product.repository";
import { ProductModule } from "@/modules/product/product.module";
import { CartModule } from "@/modules/cart/cart.module";
import { Module, forwardRef } from "@nestjs/common";

@Module({
  imports: [forwardRef(() => CartModule), ProductModule],
  controllers: [],
  providers: [
    UpdateProductInCartService,
    CartProductRepository,
    DeleteCartProductService,
  ],
  exports: [UpdateProductInCartService],
})
export class CartProductModule {}
