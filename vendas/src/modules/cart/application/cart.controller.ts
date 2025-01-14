import { DeleteProductInCartService } from "@/modules/cart/domain/use-cases/delete-product-cart/delete-product-cart.service";
import { UpdateProductCartService } from "@/modules/cart/domain/use-cases/update-product-cart/update-product-cart.service";
import { FindCartByUserId } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { ClearCartService } from "@/modules/cart/domain/use-cases/clear-cart/clear-cart.service";
import { CreateCartService } from "@/modules/cart/domain/use-cases/create/create-cart.service";
import { ReturnCartDTO } from "@/modules/cart/application/dto/return-cart.dto";
import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { UserType } from "@/modules/user/application/enum/user-type.enum";
import { CartRequestDto } from "@/modules/cart/application/dto/cart.dto";
import { UserId } from "@/decorators/user-id.decorator";
import { Roles } from "@/decorators/roles.decorator";
import { DeleteResult } from "typeorm";

@Roles(UserType.User, UserType.Admin, UserType.Admin)
@Controller("cart")
export class CartController {
  constructor(
    private readonly cartService: CreateCartService,
    private readonly findCartByUserId: FindCartByUserId,
    private readonly clearCart: ClearCartService,
    private readonly deleteProductCart: DeleteProductInCartService,
    private readonly updateProductCart: UpdateProductCartService,
  ) {}

  @Post("/create")
  async createCart(
    @Body() body: CartRequestDto,
    @UserId() userId: number,
  ): Promise<any> {
    return await this.cartService.execute(userId, body);
  }

  @Get("/by-user")
  async getCartByUserId(@UserId() userId: number): Promise<any> {
    return await this.findCartByUserId.execute(userId);
  }

  @Delete("/clear")
  async cleanCart(@UserId() userId: number): Promise<any> {
    return await this.clearCart.execute(userId);
  }

  @Delete("/product/:productId")
  async deleteProductInCart(
    @Body("productId") productId: number,
    @UserId() userId: number,
  ): Promise<DeleteResult> {
    return await this.deleteProductCart.execute(productId, userId);
  }

  @Patch()
  async updateProductInCart(
    @Body() body: CartRequestDto,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.updateProductCart.execute(body, userId),
    );
  }
}
