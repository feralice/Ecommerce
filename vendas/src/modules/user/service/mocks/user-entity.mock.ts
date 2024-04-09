import { UserEntity } from "@/modules/user/entity/user.entity";
import { UserType } from "@/modules/user/enum/user-type.enum";

export const userEntityMock = (): UserEntity => {
  return {
    cpf: "12345678901",
    createdAt: new Date(),
    email: "fernanda@lala.com",
    id: 1,
    name: "Fernanda",
    password: "123456",
    updatedAt: new Date(),
    typeUser: UserType.User,
    phone: "123456789",
  };
};
