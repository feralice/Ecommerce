export const USER = {
  TAG: "User",
  BEARER_AUTH: true,

  CREATE: {
    SUMMARY: "Criar usuário",
    DESCRIPTION: "Cria um novo usuário no sistema.",
    RESPONSE_DESCRIPTION: "Usuário criado com sucesso.",
  },

  FIND_ALL: {
    SUMMARY: "Listar usuários",
    DESCRIPTION: "Retorna todos os usuários cadastrados no sistema.",
    RESPONSE_DESCRIPTION: "Lista de usuários.",
  },

  FIND_BY_ID: {
    SUMMARY: "Buscar usuário por ID",
    DESCRIPTION: "Busca um usuário pelo seu ID, incluindo referências.",
    RESPONSE_DESCRIPTION: "Informações do usuário encontrado.",
  },

  CHANGE_PASSWORD: {
    SUMMARY: "Alterar senha do usuário",
    DESCRIPTION: "Atualiza a senha de um usuário autenticado.",
    RESPONSE_DESCRIPTION: "Senha alterada com sucesso.",
  },

  DTO: {
    CREATE_USER: {
      NAME: {
        DESCRIPTION: "Nome completo do usuário",
        EXAMPLE: "Ana Silva",
      },
      EMAIL: {
        DESCRIPTION: "Email do usuário",
        EXAMPLE: "ana@email.com",
      },
      PHONE: {
        DESCRIPTION: "Telefone do usuário",
        EXAMPLE: "(92) 99999-9999",
      },
      CPF: {
        DESCRIPTION: "CPF do usuário",
        EXAMPLE: "123.456.789-00",
      },
      PASSWORD: {
        DESCRIPTION: "Senha do usuário",
        EXAMPLE: "SenhaForte@123",
      },
    },

    UPDATE_PASSWORD: {
      OLD_PASSWORD: {
        DESCRIPTION: "Senha antiga do usuário",
        EXAMPLE: "SenhaAntiga@123",
      },
      NEW_PASSWORD: {
        DESCRIPTION: "Nova senha do usuário",
        EXAMPLE: "NovaSenha@456",
      },
    },

    USER_RESPONSE: {
      ID: {
        DESCRIPTION: "ID do usuário",
        EXAMPLE: 1,
      },
      NAME: {
        DESCRIPTION: "Nome do usuário",
        EXAMPLE: "Ana Silva",
      },
      EMAIL: {
        DESCRIPTION: "Email do usuário",
        EXAMPLE: "ana@email.com",
      },
      PHONE: {
        DESCRIPTION: "Telefone do usuário",
        EXAMPLE: "(92) 99999-9999",
      },
      CPF: {
        DESCRIPTION: "CPF do usuário",
        EXAMPLE: "123.456.789-00",
      },
      ADDRESSES: {
        DESCRIPTION: "Lista de endereços do usuário",
      },
    },
  },
};
