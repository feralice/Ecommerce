import { InsertProductInCartUseCase } from "@/modules/cart/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { UpdateProductInCartUseCase } from "@/modules/cart/domain/use-cases/update-product-cart/update-product-cart.service";
import { DeleteProductCartUseCase } from "@/modules/cart/domain/use-cases/delete-product-cart/delete-product-cart.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { FindCartByUserIdUseCase } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { ClearCartUseCase } from "@/modules/cart/domain/use-cases/clear-cart/clear-cart.service";
import { ReturnCartDTO } from "@/modules/cart/application/dto/return-cart.dto";
import { UpdateCartDTO } from "@/modules/cart/application/dto/update-cart.dto";
import { CART } from "@/modules/cart/application/constants/cart.constant";
import { UserType } from "@/modules/user/application/enum/user-type.enum";
import { InsertCartDTO } from "@/modules/cart/application/dto/cart.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserId } from "@/decorators/user-id.decorator";
import { Roles } from "@/decorators/roles.decorator";
import { DeleteResult } from "typeorm";
import { Response } from "express";

@Roles(UserType.User, UserType.Admin, UserType.Root)
@Controller("cart")
@ApiTags(CART.TAG)
export class CartController {
  constructor(
    private readonly insertProductInCartUseCase: InsertProductInCartUseCase,
    private readonly findCartByUserIdUseCase: FindCartByUserIdUseCase,
    private readonly clearCartUseCase: ClearCartUseCase,
    private readonly deleteProductCartUseCase: DeleteProductCartUseCase,
    private readonly updateProductInCartUseCase: UpdateProductInCartUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: CART.CREATE.SUMMARY,
    description: CART.CREATE.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CART.CREATE.RESPONSE_DESCRIPTION,
    type: ReturnCartDTO,
  })
  async createCart(
    @Body() insertCart: InsertCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.insertProductInCartUseCase.execute(insertCart, userId),
    );
  }

  @Get()
  @ApiOperation({
    summary: CART.FIND_BY_USER_ID.SUMMARY,
    description: CART.FIND_BY_USER_ID.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CART.FIND_BY_USER_ID.RESPONSE_DESCRIPTION,
    type: ReturnCartDTO,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Carrinho não encontrado.",
  })
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

    res.status(HttpStatus.NO_CONTENT).send();
    return;
  }

  @Delete()
  @ApiOperation({
    summary: CART.CLEAR.SUMMARY,
    description: CART.CLEAR.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CART.CLEAR.RESPONSE_DESCRIPTION,
    type: DeleteResult,
  })
  async clearCart(@UserId() userId: number): Promise<DeleteResult> {
    return this.clearCartUseCase.execute(userId);
  }

  @Delete("/product/:productId")
  @ApiOperation({
    summary: CART.DELETE_PRODUCT.SUMMARY,
    description: CART.DELETE_PRODUCT.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CART.DELETE_PRODUCT.RESPONSE_DESCRIPTION,
    type: DeleteResult,
  })
  async deleteProductCart(
    @Param("productId") productId: number,
    @UserId() userId: number,
  ): Promise<DeleteResult> {
    return this.deleteProductCartUseCase.execute(productId, userId);
  }

  @Patch()
  @ApiOperation({
    summary: CART.UPDATE_PRODUCT.SUMMARY,
    description: CART.UPDATE_PRODUCT.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: CART.UPDATE_PRODUCT.RESPONSE_DESCRIPTION,
    type: ReturnCartDTO,
  })
  async updateProductInCart(
    @Body() updateCartDTO: UpdateCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.updateProductInCartUseCase.execute(updateCartDTO, userId),
    );
  }
}
