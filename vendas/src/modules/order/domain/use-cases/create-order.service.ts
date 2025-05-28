import { FindCartByUserIdUseCase } from "@/modules/cart/domain/use-cases/find-by-user-id/find-by-user-id.service";
import { CreatePaymentService } from "@/modules/payment/domain/use-case/create-payment/create-payment.service";
import { ClearCartUseCase } from "@/modules/cart/domain/use-cases/clear-cart/clear-cart.service";
import { OrderRepository } from "@/modules/order/infrastructure/repository/order.repository";
import { CreateOrderDTO } from "@/modules/order/application/dto/create-order.dto";
import { ProductService } from "@/modules/product/domain/service/product.service";
import { OrderEntity } from "@/modules/order/domain/entity/order.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateOrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly paymentService: CreatePaymentService,
    private readonly findCartByUserIdUseCase: FindCartByUserIdUseCase,
    private readonly productService: ProductService,
    private readonly clearCartUseCase: ClearCartUseCase,
  ) {}

  async execute(
    createOrderDTO: CreateOrderDTO,
    cartId: number,
    userId: number,
  ): Promise<OrderEntity> {
    const cart = await this.findCartByUserIdUseCase.execute(userId);
    const products = await this.productService.findAll(
      cart.cartProduct?.map((cartProduct) => cartProduct.productId),
    );

    const payment = await this.paymentService.execute(
      createOrderDTO,
      products,
      cart,
    );

    const order = await this.orderRepository.createOrder(
      createOrderDTO,
      userId,
      payment,
    );

        await this.createOrderProductUsingCart(cart, order.id, products);


    await this.clearCartUseCase.execute(userId);

    return order;
  }
}
