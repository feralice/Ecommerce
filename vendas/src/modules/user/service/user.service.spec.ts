import { createUserMock } from "@/modules/user/service/mocks/create-user.mock";
import { userEntityMock } from "@/modules/user/service/mocks/user.mock";
import { UserService } from "@/modules/user/service/user.service";
import { UserEntity } from "@/modules/user/entity/user.entity";
import { UserType } from "@/modules/user/enum/user-type.enum";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";

describe("UserService", () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it("should return user findUserByEmail", async () => {
    const user = await service.findUserByEmail(userEntityMock.email);
    expect(user).toEqual(userEntityMock);
  });

  it("should return error if user dont exist", async () => {
    jest.spyOn(userRepository, "findOne").mockResolvedValue(undefined);
    expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow(
      NotFoundException,
    );
  });

  it("should return user in findUserById", async () => {
    const user = await service.findUserById(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it("should return error in findUserById", async () => {
    jest.spyOn(userRepository, "findOne").mockResolvedValue(undefined);

    expect(
      service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrowError();
  });

  it("should return error in findUserById (error DB)", async () => {
    jest.spyOn(userRepository, "findOne").mockRejectedValueOnce(new Error());

    expect(service.findUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it("should return error if user exist", async () => {
    expect(service.createUser(createUserMock)).rejects.toThrowError();
  });

  it("should return user if user not exist", async () => {
    const spy = jest.spyOn(userRepository, "save");
    jest.spyOn(userRepository, "findOne").mockResolvedValue(undefined);

    const user = await service.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
    expect(spy.mock.calls[0][0].typeUser).toEqual(UserType.User);
  });
});
