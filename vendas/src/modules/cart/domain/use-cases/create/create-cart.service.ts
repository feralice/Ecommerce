import { UpdateProductInCartService } from "@/modules/cart-product/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { CartRepository } from "@/modules/cart/infrastructure/cart.repository";
import { CartRequestDto } from "@/modules/cart/application/dto/cart.dto";
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class CreateCartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly updateProductInCartService: UpdateProductInCartService,
  ) {}

  async execute(userId: number, body: CartRequestDto): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.updateProductInCartService.insertProductInCart(body, cart);

    return cart;
  }

  async findCartByUserId(userId: number): Promise<CartEntity> {
    const cart = await this.cartRepository.verifyCartExists(userId);
    if (!cart) {
      throw new NotFoundException("Cart not found");
    }
    return cart;
  }

  async createCart(userId: number): Promise<CartEntity> {
    return await this.cartRepository.createCart(userId);
  }
}
