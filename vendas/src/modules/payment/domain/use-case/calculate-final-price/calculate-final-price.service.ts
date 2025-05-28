import { ProductEntity } from "@/modules/product/domain/entity/product.entity";
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CalculateFinalPriceService {
  execute(cart: CartEntity, products: ProductEntity[]): number {
    let total = 0;

    for (const item of cart.cartProduct ?? []) {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        total += item.amount * product.price;
      }
    }

    return Number(total.toFixed(2));
  }
}
