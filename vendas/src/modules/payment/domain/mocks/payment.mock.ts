import { ProductEntity } from "@/modules/product/domain/entity/product.entity";
import { CartEntity } from "@/modules/cart/domain/cart.entity";

export const mockProducts: ProductEntity[] = [
  {
    id: 1,
    name: "Product 1",
    categoryId: 1,
    price: 100,
    image: "image1.jpg",
    weight: 1,
    length: 10,
    height: 5,
    width: 3,
    diameter: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    cartProduct: [],
    category: undefined,
    ordersProduct: [],
  },
  {
    id: 2,
    name: "Product 2",
    categoryId: 2,
    price: 50,
    image: "image2.jpg",
    weight: 2,
    length: 20,
    height: 8,
    width: 4,
    diameter: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    cartProduct: [],
    category: undefined,
    ordersProduct: [],
  },
];

export const mockCart: CartEntity = {
  cartProduct: [
    { productId: 1, amount: 2 } as any,
    { productId: 2, amount: 1 } as any,
  ],
} as CartEntity;
