export const CATEGORY = {
  TAG: "Category",
  BEARER_AUTH: true,

  FIND_ALL: {
    SUMMARY: "Listar categorias",
    DESCRIPTION: "Retorna todas as categorias cadastradas.",
    RESPONSE_DESCRIPTION: "Lista de categorias.",
  },

  CREATE: {
    SUMMARY: "Criar categoria",
    DESCRIPTION: "Cria uma nova categoria no sistema.",
    RESPONSE_DESCRIPTION: "Categoria criada com sucesso.",
  },

  DTO: {
    CATEGORY_RESPONSE: {
      ID: {
        DESCRIPTION: "ID da categoria",
        EXAMPLE: 1,
      },
      NAME: {
        DESCRIPTION: "Nome da categoria",
        EXAMPLE: "Eletrônicos",
      },
    },

    CREATE_CATEGORY: {
      NAME: {
        DESCRIPTION: "Nome da nova categoria",
        EXAMPLE: "Esportes",
      },
    },

    RETURN_CATEGORY: {
      ID: {
        DESCRIPTION: "ID da categoria",
        EXAMPLE: 1,
      },
      NAME: {
        DESCRIPTION: "Nome da categoria",
        EXAMPLE: "Eletrônicos",
      },
      AMOUNT_PRODUCTS: {
        DESCRIPTION: "Quantidade de produtos associados à categoria",
        EXAMPLE: 10,
      },
      PRODUCTS: {
        DESCRIPTION: "Lista de produtos vinculados à categoria",
      },
    },
  },
};
