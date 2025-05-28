import { ProductEntity } from "@/modules/product/domain/entity/product.entity";
import { CalculateFinalPriceService } from "./calculate-final-price.service";
import { CartEntity } from "@/modules/cart/domain/cart.entity";

describe("CalculateFinalPriceService", () => {
  let service: CalculateFinalPriceService;

  beforeEach(() => {
    service = new CalculateFinalPriceService();
  });

  const mockProducts: ProductEntity[] = [
    { id: 1, price: 100 } as ProductEntity,
    { id: 2, price: 50 } as ProductEntity,
  ];

  it("should calculate total price correctly", () => {
    const cart: CartEntity = {
      cartProduct: [
        { productId: 1, amount: 2 },
        { productId: 2, amount: 1 },
      ],
    } as CartEntity;

    const result = service.execute(cart, mockProducts);
    expect(result).toBe(250);
  });

  it("should return 0 if cart is empty", () => {
    const cart: CartEntity = {
      cartProduct: [],
    } as CartEntity;

    const result = service.execute(cart, mockProducts);
    expect(result).toBe(0);
  });

  it("should ignore products that do not exist in product list", () => {
    const cart: CartEntity = {
      cartProduct: [
        { productId: 99, amount: 2 },
        { productId: 1, amount: 1 },
      ],
    } as CartEntity;

    const result = service.execute(cart, mockProducts);
    expect(result).toBe(100);
  });

  it("should handle undefined cartProduct gracefully", () => {
    const cart: CartEntity = {} as CartEntity;

    const result = service.execute(cart, mockProducts);
    expect(result).toBe(0);
  });
});
