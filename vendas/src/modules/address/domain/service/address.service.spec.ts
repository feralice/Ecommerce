import { AddressRepository } from "@/modules/address/infrastructure/repository/address.repository";
import { userEntityMock } from "@/modules/user/domain/service/mocks/user-entity.mock";
import { mockCity } from "@/modules/city/domain/service/mocks/city-entity.mock";
import { CityService } from "@/modules/city/domain/service/city.service";
import { UserService } from "@/modules/user/domain/service/user.service";
import { AddressEntity } from "../entity/address.entity";
import { createAddressDto } from "./mocks/address.mock";
import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { AddressService } from "@/modules/address/domain/service/address.service";

describe("AddressService tests", () => {
  let service: AddressService;
  let repository: AddressRepository;
  let userService: UserService;
  let cityService: CityService;

  const userId = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: AddressRepository,
          useValue: {
            createAddress: jest.fn(),
            findAddressByUserId: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn(),
          },
        },
        {
          provide: CityService,
          useValue: {
            findCityById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    repository = module.get<AddressRepository>(AddressRepository);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
  });

  describe("createAddress", () => {
    it("should create a new address", async () => {
      jest
        .spyOn(userService, "findUserById")
        .mockResolvedValueOnce(userEntityMock());
      jest.spyOn(cityService, "findCityById").mockResolvedValueOnce(mockCity());
      jest
        .spyOn(repository, "createAddress")
        .mockResolvedValueOnce({} as AddressEntity);

      const result = await service.createAddress(createAddressDto(), userId);

      expect(userService.findUserById).toHaveBeenCalledWith(userId);
      expect(cityService.findCityById).toHaveBeenCalledWith(
        createAddressDto().cityId,
      );
      expect(repository.createAddress).toHaveBeenCalledWith(
        createAddressDto(),
        userId,
      );
      expect(result).toEqual({} as AddressEntity);
    });
  });

  describe("findAddressByUserId", () => {
    it("should return a list of addresses", async () => {
      jest
        .spyOn(repository, "findAddressByUserId")
        .mockResolvedValueOnce([{} as AddressEntity]);

      const result = await service.findAddressByUserId(userId);

      expect(repository.findAddressByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual([{} as AddressEntity]);
    });
  });

  describe("UserId not found", () => {
    it("should throw a NotFoundException", async () => {
      jest.spyOn(userService, "findUserById").mockRejectedValueOnce({});

      try {
        await service.createAddress(createAddressDto(), userId);
      } catch (error) {
        expect(error.message).toBe("Not Found");
      }

      try {
        await service.findAddressByUserId(userId);
      } catch (error) {
        expect(error.message).toBe("Not Found");
      }
    });
  });

  describe("Address is not found", () => {
    it("should throw a NotFoundException", async () => {
      jest
        .spyOn(service, "findAddressByUserId")
        .mockRejectedValueOnce(new NotFoundException("Address not found!"));

      expect(service.findAddressByUserId(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
