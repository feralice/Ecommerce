import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { InsertProductInCartUseCase } from "@/modules/cart/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { UpdateProductInCartUseCase } from "@/modules/cart/domain/use-cases/update-product-cart/update-product-cart.service";
import { DeleteProductCartUseCase } from "@/modules/cart/domain/use-cases/delete-product-cart/delete-product-cart.service";
import { FindCartByUserIdUseCase } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { ClearCartUseCase } from "@/modules/cart/domain/use-cases/clear-cart/clear-cart.service";
import { ReturnCartDTO } from "@/modules/cart/application/dto/return-cart.dto";
import { UpdateCartDTO } from "@/modules/cart/application/dto/update-cart.dto";
import { UserType } from "@/modules/user/application/enum/user-type.enum";
import { InsertCartDTO } from "@/modules/cart/application/dto/cart.dto";
import { UserId } from "@/decorators/user-id.decorator";
import { Roles } from "@/decorators/roles.decorator";
import { DeleteResult } from "typeorm";
import { Response } from "express";

@Roles(UserType.User, UserType.Admin, UserType.Root)
@Controller("cart")
export class CartController {
  constructor(
    private readonly insertProductInCartUseCase: InsertProductInCartUseCase,
    private readonly findCartByUserIdUseCase: FindCartByUserIdUseCase,
    private readonly clearCartUseCase: ClearCartUseCase,
    private readonly deleteProductCartUseCase: DeleteProductCartUseCase,
    private readonly updateProductInCartUseCase: UpdateProductInCartUseCase,
  ) {}

  @Post()
  async createCart(
    @Body() insertCart: InsertCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.insertProductInCartUseCase.execute(insertCart, userId),
    );
  }

  @Get()
  async findCartByUserId(
    @UserId() userId: number,
    @Res({ passthrough: true }) res?: Response,
  ): Promise<ReturnCartDTO> {
    const cart = await this.findCartByUserIdUseCase
      .execute(userId, true)
      .catch(() => undefined);

    if (cart) {
      return new ReturnCartDTO(cart);
    }

    res.status(204).send();
    return;
  }

  @Delete()
  async clearCart(@UserId() userId: number): Promise<DeleteResult> {
    return this.clearCartUseCase.execute(userId);
  }

  @Delete("/product/:productId")
  async deleteProductCart(
    @Param("productId") productId: number,
    @UserId() userId: number,
  ): Promise<DeleteResult> {
    return this.deleteProductCartUseCase.execute(productId, userId);
  }

  @Patch()
  async updateProductInCart(
    @Body() updateCartDTO: UpdateCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.updateProductInCartUseCase.execute(updateCartDTO, userId),
    );
  }
}
