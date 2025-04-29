export const CITY = {
  TAG: "City",
  BEARER_AUTH: true,

  FIND_BY_STATE_ID: {
    SUMMARY: "Listar cidades por estado",
    DESCRIPTION:
      "Retorna todas as cidades cadastradas de um estado específico pelo ID.",
    RESPONSE_DESCRIPTION: "Lista de cidades do estado informado.",
  },

  DTO: {
    CITY_RESPONSE: {
      NAME: {
        DESCRIPTION: "Nome da cidade",
        EXAMPLE: "Manaus",
      },
      STATE: {
        DESCRIPTION: "Estado ao qual a cidade pertence",
      },
    },
  },
};
