import { CategoryEntity } from "../../entity/category.entity";

export const mockCategoryEntity = (): CategoryEntity => {
  return {
    id: 1,
    name: "Category",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    products: [],
  };
};
