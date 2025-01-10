import { CreateCartService } from "@/modules/cart/domain/use-cases/create/create-cart.service";
import { UserType } from "@/modules/user/application/enum/user-type.enum";
import { CartRequestDto } from "@/modules/cart/application/dto/cart.dto";
import { UserId } from "@/decorators/user-id.decorator";
import { Body, Controller, Post } from "@nestjs/common";
import { Roles } from "@/decorators/roles.decorator";

@Roles(UserType.User, UserType.Admin, UserType.Admin)
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CreateCartService) {}

  @Post("/create")
  async createCart(
    @Body() body: CartRequestDto,
    @UserId() userId: number,
  ): Promise<any> {
    return await this.cartService.execute(userId, body);
  }
}
