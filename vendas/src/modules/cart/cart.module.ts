import { DeleteProductInCartService } from "@/modules/cart/domain/use-cases/delete-product-cart/delete-product-cart.service";
import { UpdateProductCartService } from "@/modules/cart/domain/use-cases/update-product-cart/update-product-cart.service";
import { FindCartByUserId } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { ClearCartService } from "@/modules/cart/domain/use-cases/clear-cart/clear-cart.service";
import { CreateCartService } from "@/modules/cart/domain/use-cases/create/create-cart.service";
import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { CartProductModule } from "@/modules/cart-product/cart-product.module";
import { CartController } from "@/modules/cart/application/cart.controller";
import { Module, forwardRef } from "@nestjs/common";

@Module({
  imports: [forwardRef(() => CartProductModule)],
  controllers: [CartController],
  providers: [
    CreateCartService,
    CartRepository,
    FindCartByUserId,
    ClearCartService,
    DeleteProductInCartService,
    UpdateProductCartService,
  ],
  exports: [CreateCartService],
})
export class CartModule {}
