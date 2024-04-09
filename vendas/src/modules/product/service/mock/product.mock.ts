import { mockCategoryEntity } from "@/modules/category/service/mock/category.mock";
import { ProductEntity } from "../../entity/product.entity";

export const mockProductEntity = (): ProductEntity[] => {
  const product1: ProductEntity = {
    id: 1,
    name: "Product 1",
    categoryId: 1,
    price: 10,
    image: "product1.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: mockCategoryEntity(),
  };

  const product2: ProductEntity = {
    id: 2,
    name: "Product 2",
    categoryId: 2,
    price: 15,
    image: "product2.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: mockCategoryEntity(),
  };

  return [product1, product2];
};
