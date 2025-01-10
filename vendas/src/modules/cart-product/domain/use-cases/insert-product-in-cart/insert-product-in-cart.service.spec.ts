import { UpdateProductInCartService } from "@/modules/cart-product/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { CartProductRepository } from "@/modules/cart-product/infrastructure/cart-product.repository";
import { CartProductEntity } from "@/modules/cart-product/domain/cart-product.entity";
import { ProductService } from "@/modules/product/domain/service/product.service";
import { ProductEntity } from "@/modules/product/domain/entity/product.entity";
import { CartRequestDto } from "@/modules/cart/application/dto/cart.dto";
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";

describe("UpdateProductInCartService", () => {
  let service: UpdateProductInCartService;
  let cartProductRepository: CartProductRepository;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProductInCartService,
        {
          provide: CartProductRepository,
          useValue: {
            verifyProductInCart: jest.fn(),
            createProductInCart: jest.fn(),
            updateProductAmount: jest.fn(),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findProductById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateProductInCartService>(
      UpdateProductInCartService,
    );
    cartProductRepository = module.get<CartProductRepository>(
      CartProductRepository,
    );
    productService = module.get<ProductService>(ProductService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("insertProductInCart", () => {
    it("should add a new product to the cart when it does not exist", async () => {
      const cart: CartEntity = { id: 1, userId: 1, active: true } as CartEntity;
      const insertCartDTO: CartRequestDto = { productId: 101, amount: 2 };
      const newCartProduct: CartProductEntity = {
        id: 1,
        productId: 101,
        cartId: 1,
        amount: 2,
      } as CartProductEntity;

      jest.spyOn(productService, "findProductById").mockResolvedValue({
        id: 101,
        name: "Mock Product",
        categoryId: 1,
        price: 100,
        image: "mock-image.jpg",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-02T00:00:00Z",
        category: {
          id: 1,
          name: "Mock Category",
        },
        cartProduct: [],
      } as ProductEntity);

      jest
        .spyOn(cartProductRepository, "verifyProductInCart")
        .mockRejectedValue(new NotFoundException());
      jest
        .spyOn(cartProductRepository, "createProductInCart")
        .mockResolvedValue(newCartProduct);

      const result = await service.insertProductInCart(insertCartDTO, cart);

      expect(productService.findProductById).toHaveBeenCalledWith(101);
      expect(cartProductRepository.verifyProductInCart).toHaveBeenCalledWith(
        101,
        1,
      );
      expect(cartProductRepository.createProductInCart).toHaveBeenCalledWith(
        insertCartDTO,
        1,
      );
      expect(result).toEqual(newCartProduct);
    });

    it("should update the product amount when it already exists in the cart", async () => {
      const cart: CartEntity = { id: 1, userId: 1, active: true } as CartEntity;
      const insertCartDTO: CartRequestDto = { productId: 102, amount: 3 };
      const existingCartProduct: CartProductEntity = {
        id: 2,
        productId: 102,
        cartId: 1,
        amount: 5,
      } as CartProductEntity;
      const updatedCartProduct: CartProductEntity = {
        ...existingCartProduct,
        amount: 8,
      };

      jest.spyOn(productService, "findProductById").mockResolvedValue({
        id: 102,
        name: "Existing Product",
        categoryId: 2,
        price: 150,
        image: "existing-product.jpg",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-02T00:00:00Z",
        category: {
          id: 2,
          name: "Existing Category",
        },
        cartProduct: [],
      } as ProductEntity);

      jest
        .spyOn(cartProductRepository, "verifyProductInCart")
        .mockResolvedValue(existingCartProduct);
      jest
        .spyOn(cartProductRepository, "updateProductAmount")
        .mockResolvedValue(updatedCartProduct);

      const result = await service.insertProductInCart(insertCartDTO, cart);

      expect(productService.findProductById).toHaveBeenCalledWith(102);
      expect(cartProductRepository.verifyProductInCart).toHaveBeenCalledWith(
        102,
        1,
      );
      expect(cartProductRepository.updateProductAmount).toHaveBeenCalledWith(
        existingCartProduct,
        3,
      );
      expect(result).toEqual(updatedCartProduct);
    });
  });
});
