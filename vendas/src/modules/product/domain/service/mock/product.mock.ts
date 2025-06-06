import { mockCategoryEntity } from "@/modules/category/domain/service/mock/category.mock";
import { ProductEntity } from "@/modules/product/domain/entity/product.entity";

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
    weight: 0,
    length: 0,
    height: 0,
    width: 0,
    diameter: 0,
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
    weight: 0,
    length: 0,
    height: 0,
    width: 0,
    diameter: 0,
  };

  return [product1, product2];
};
