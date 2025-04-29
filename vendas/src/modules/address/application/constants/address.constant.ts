export const ADDRESS = {
  TAG: "Address",
  BEARER_AUTH: true,

  CREATE: {
    SUMMARY: "Criar endereço",
    DESCRIPTION: "Cria um novo endereço vinculado ao usuário autenticado.",
    RESPONSE_DESCRIPTION: "Endereço criado com sucesso.",
  },

  FIND_BY_USER: {
    SUMMARY: "Listar endereços do usuário",
    DESCRIPTION:
      "Retorna todos os endereços cadastrados para o usuário autenticado.",
    RESPONSE_DESCRIPTION: "Lista de endereços vinculados ao usuário.",
  },

  DTO: {
    CREATE_ADDRESS: {
      COMPLEMENT: {
        DESCRIPTION: "Complemento do endereço",
        EXAMPLE: "Apartamento 301",
      },
      NUMBER: {
        DESCRIPTION: "Número do endereço",
        EXAMPLE: 123,
      },
      CEP: {
        DESCRIPTION: "CEP do endereço",
        EXAMPLE: "69000-000",
      },
      CITY_ID: {
        DESCRIPTION: "ID da cidade vinculada ao endereço",
        EXAMPLE: 1,
      },
    },
    ADDRESS_RESPONSE: {
      COMPLEMENT: {
        DESCRIPTION: "Complemento do endereço",
        EXAMPLE: "Apartamento 301",
      },
      NUMBER: {
        DESCRIPTION: "Número do endereço",
        EXAMPLE: 123,
      },
      CEP: {
        DESCRIPTION: "CEP do endereço",
        EXAMPLE: "69000-000",
      },
      CITY: {
        DESCRIPTION: "Cidade vinculada ao endereço",
      },
    },
  },
};
