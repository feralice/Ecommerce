import { CreateCartService } from "@/modules/cart/domain/use-cases/create/create-cart.service";
import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { CartProductModule } from "@/modules/cart-product/cart-product.module";
import { CartController } from "@/modules/cart/application/cart.controller";
import { Module, forwardRef } from "@nestjs/common";

@Module({
  imports: [forwardRef(() => CartProductModule)],
  controllers: [CartController],
  providers: [CreateCartService, CartRepository],
  exports: [CreateCartService],
})
export class CartModule {}
