import { UserEntity } from "../entity/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
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
