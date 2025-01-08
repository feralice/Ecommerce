import { CreateUserDto } from "@/modules/user/application/dto/request/create-user.dto";

export const createUserMock = (): CreateUserDto => {
  return {
    cpf: "3214215151",
    email: "emailMockTest@email.com",
    name: "qudlsjakf",
    password: "password",
    phone: "325632634",
  };
};
