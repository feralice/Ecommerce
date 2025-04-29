export const AUTH = {
  TAG: "Auth",
  BEARER_AUTH: false,

  LOGIN: {
    SUMMARY: "Login de usuário",
    DESCRIPTION:
      "Realiza o login do usuário e retorna o token JWT e informações do usuário.",
    RESPONSE_DESCRIPTION: "Usuário autenticado e token de acesso retornado.",
  },

  DTO: {
    LOGIN: {
      EMAIL: {
        DESCRIPTION: "Email do usuário",
        EXAMPLE: "usuario@email.com",
      },
      PASSWORD: {
        DESCRIPTION: "Senha do usuário",
        EXAMPLE: "SenhaForte@123",
      },
    },
    RETURN_LOGIN: {
      USER: {
        DESCRIPTION: "Informações do usuário logado",
      },
      ACCESS_TOKEN: {
        DESCRIPTION: "Token JWT para autenticação",
        EXAMPLE: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
    },
  },
};
