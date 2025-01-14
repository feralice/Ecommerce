import { UpdateProductInCartService } from "@/modules/cart-product/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { FindCartByUserId } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { CartRequestDto } from "@/modules/cart/application/dto/cart.dto";
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateCartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly findCartByUserId: FindCartByUserId,
    private readonly updateProductInCartService: UpdateProductInCartService,
  ) {}

  async execute(userId: number, body: CartRequestDto): Promise<CartEntity> {
    const cart = await this.findCartByUserId.execute(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.updateProductInCartService.insertProductInCart(body, cart);

    return cart;
  }

  async createCart(userId: number): Promise<CartEntity> {
    return await this.cartRepository.createCart(userId);
  }
}
