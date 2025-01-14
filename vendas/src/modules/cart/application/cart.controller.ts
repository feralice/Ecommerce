import { FindCartByUserId } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { ClearCartService } from "@/modules/cart/domain/use-cases/clear-cart/clear-cart.service";
import { CreateCartService } from "@/modules/cart/domain/use-cases/create/create-cart.service";
import { UserType } from "@/modules/user/application/enum/user-type.enum";
import { CartRequestDto } from "@/modules/cart/application/dto/cart.dto";
import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { UserId } from "@/decorators/user-id.decorator";
import { Roles } from "@/decorators/roles.decorator";

@Roles(UserType.User, UserType.Admin, UserType.Admin)
@Controller("cart")
export class CartController {
  constructor(
    private readonly cartService: CreateCartService,
    private readonly findCartByUserId: FindCartByUserId,
    private readonly clearCart: ClearCartService,
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
}
