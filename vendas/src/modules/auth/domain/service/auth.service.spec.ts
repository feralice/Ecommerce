import { UserResponseDto } from "@/modules/user/application/dto/response/user-response.dto";
import { ReturnLoginDto } from "@/modules/auth/application/dto/return-login.dto";
import { AuthController } from "@/modules/auth/application/auth.controller";
import { AuthService } from "@/modules/auth/domain/service/auth.service";
import { LoginDto } from "@/modules/auth/application/dto/login.dto";
import { Test, TestingModule } from "@nestjs/testing";

describe("AuthController", () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe("login", () => {
    it("should return a user and accessToken", async () => {
      const loginDto: LoginDto = {
        email: "test@example.com",
        password: "123456",
      };

      const userMock: UserResponseDto = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        phone: "99999-9999",
        cpf: "123.456.789-00",
        addresses: [],
      };

      const accessTokenMock = "mocked-access-token";

      const returnLoginDto: ReturnLoginDto = {
        user: userMock,
        accessToken: accessTokenMock,
      };

      (authService.login as jest.Mock).mockResolvedValue(returnLoginDto);

      const result = await authController.login(loginDto);

      expect(result).toEqual(returnLoginDto);
      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });
});
