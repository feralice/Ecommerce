import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateOrderService } from "@/modules/order/domain/use-cases/create-order.service";
import { CreateOrderDTO } from "@/modules/order/application/dto/create-order.dto";
import { ORDER } from "@/modules/order/application/constant/order.constant";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserId } from "@/decorators/user-id.decorator";

@Controller("order")
export class OrderController {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @Post("/cart/:cartId")
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: ORDER.CREATE.SUMMARY,
    description: ORDER.CREATE.DESCRIPTION,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ORDER.CREATE.RESPONSE_DESCRIPTION,
  })
  async createOrder(
    @Body() createOrderDTO: CreateOrderDTO,
    @Param("cartId") cartId: number,
    @UserId() userId: number,
  ) {
    await this.createOrderService.execute(createOrderDTO, cartId, userId);
  }
}
