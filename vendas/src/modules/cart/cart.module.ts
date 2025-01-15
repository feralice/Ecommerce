import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { CartController } from "@/modules/cart/application/cart.controller";
import { Module, forwardRef } from "@nestjs/common";

import { InsertProductInCartUseCase } from "@/modules/cart/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { UpdateProductInCartUseCase } from "@/modules/cart/domain/use-cases/update-product-cart/update-product-cart.service";
import { DeleteProductCartUseCase } from "@/modules/cart/domain/use-cases/delete-product-cart/delete-product-cart.service";
import { FindCartByUserIdUseCase } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { ClearCartUseCase } from "@/modules/cart/domain/use-cases/clear-cart/clear-cart.service";
import { CreateCartUseCase } from "@/modules/cart/domain/use-cases/create/create-cart.service";
import { CartProductModule } from "@/modules/cart-product/cart-product.module";

@Module({
  imports: [forwardRef(() => CartProductModule)],
  controllers: [CartController],
  providers: [
    CartRepository,
    // Use Cases
    CreateCartUseCase,
    FindCartByUserIdUseCase,
    ClearCartUseCase,
    InsertProductInCartUseCase,
    UpdateProductInCartUseCase,
    DeleteProductCartUseCase,
  ],
  exports: [
    CreateCartUseCase,
    FindCartByUserIdUseCase,
    ClearCartUseCase,
    InsertProductInCartUseCase,
    UpdateProductInCartUseCase,
    DeleteProductCartUseCase,
  ],
})
export class CartModule {}
