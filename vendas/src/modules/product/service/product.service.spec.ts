import { mockCategoryEntity } from "@/modules/category/service/mock/category.mock";
import { mockProductEntity } from "@/modules/product/service/mock/product.mock";
import { CategoryService } from "@/modules/category/service/category.service";
import { ProductRepository } from "../repository/product.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "./product.service";

describe("ProductService tests", () => {
  let service: ProductService;
  let categoryService: CategoryService;
  let repository: ProductRepository;

  const category = mockCategoryEntity();
  const product = mockProductEntity();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: {
            getAllProducts: jest.fn(),
            createProduct: jest.fn(),
            getProductById: jest.fn(),
            deleteProduct: jest.fn(),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  describe("findAllProduct", () => {
    it("should return all products in database", async () => {
      jest.spyOn(repository, "getAllProducts").mockResolvedValueOnce(product);

      const result = await service.findAllProduct();

      expect(result).toEqual(product);
      expect(repository.getAllProducts).toHaveBeenCalled();
    });

    it("should throw an error if getAllProducts throws", async () => {
      jest
        .spyOn(repository, "getAllProducts")
        .mockRejectedValueOnce(new Error());
      await expect(service.findAllProduct()).rejects.toThrow(Error);
    });
  });

  describe("createProduct", () => {
    it("should create a new product", async () => {
      jest.spyOn(repository, "createProduct").mockResolvedValueOnce(product[0]);
      jest
        .spyOn(categoryService, "findCategoryById")
        .mockResolvedValueOnce(category);

      const result = await service.createProduct(product[0]);

      expect(result).toEqual(product[0]);
      expect(repository.createProduct).toHaveBeenCalledWith(product[0]);
    });

    it("should throw an error if createProduct throws", async () => {
      jest
        .spyOn(repository, "createProduct")
        .mockRejectedValueOnce(new Error());
      jest
        .spyOn(categoryService, "findCategoryById")
        .mockResolvedValueOnce(category);

      await expect(service.createProduct(product[0])).rejects.toThrow(Error);
    });
  });
});
