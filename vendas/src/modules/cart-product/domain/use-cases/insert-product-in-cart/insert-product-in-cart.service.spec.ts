import { UpdateProductInCartService } from "@/modules/cart-product/domain/use-cases/insert-product-in-cart/insert-product-in-cart.service";
import { CartProductRepository } from "@/modules/cart-product/infrastructure/cart-product.repository";
import { CartProductEntity } from "@/modules/cart-product/domain/cart-product.entity";
import { ProductService } from "@/modules/product/domain/service/product.service";
import { InsertCartDTO } from "@/modules/cart/application/dto/cart.dto";
import { CartEntity } from "@/modules/cart/domain/cart.entity";
import { Test, TestingModule } from "@nestjs/testing";

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

    service = module.get(UpdateProductInCartService);
    cartProductRepository = module.get(CartProductRepository);
    productService = module.get(ProductService);
  });

  it("should create a new product in cart if it does not exist", async () => {
    const insertCartDTO: InsertCartDTO = { productId: 1, amount: 2 };
    const cart: CartEntity = { id: 10 } as CartEntity;
    const createdCartProduct = { id: 100 } as CartProductEntity;

    (productService.findProductById as jest.Mock).mockResolvedValue({});
    (cartProductRepository.verifyProductInCart as jest.Mock).mockRejectedValue(
      new Error("Not Found"),
    );
    (cartProductRepository.createProductInCart as jest.Mock).mockResolvedValue(
      createdCartProduct,
    );

    const result = await service.insertProductInCart(insertCartDTO, cart);

    expect(productService.findProductById).toHaveBeenCalledWith(
      insertCartDTO.productId,
    );
    expect(cartProductRepository.verifyProductInCart).toHaveBeenCalledWith(
      insertCartDTO.productId,
      cart.id,
    );
    expect(cartProductRepository.createProductInCart).toHaveBeenCalledWith(
      insertCartDTO,
      cart.id,
    );
    expect(result).toEqual(createdCartProduct);
  });

  it("should update the product amount if the product already exists in the cart", async () => {
    const insertCartDTO: InsertCartDTO = { productId: 1, amount: 5 };
    const cart: CartEntity = { id: 10 } as CartEntity;
    const existingCartProduct = { id: 200 } as CartProductEntity;
    const updatedCartProduct = { id: 200, amount: 5 } as CartProductEntity;

    (productService.findProductById as jest.Mock).mockResolvedValue({});
    (cartProductRepository.verifyProductInCart as jest.Mock).mockResolvedValue(
      existingCartProduct,
    );
    (cartProductRepository.updateProductAmount as jest.Mock).mockResolvedValue(
      updatedCartProduct,
    );

    const result = await service.insertProductInCart(insertCartDTO, cart);

    expect(productService.findProductById).toHaveBeenCalledWith(
      insertCartDTO.productId,
    );
    expect(cartProductRepository.verifyProductInCart).toHaveBeenCalledWith(
      insertCartDTO.productId,
      cart.id,
    );
    expect(cartProductRepository.updateProductAmount).toHaveBeenCalledWith(
      existingCartProduct,
      insertCartDTO.amount,
    );
    expect(result).toEqual(updatedCartProduct);
  });
});
