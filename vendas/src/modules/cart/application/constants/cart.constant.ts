export const CART = {
  TAG: "Cart",
  BEARER_AUTH: true,

  CREATE: {
    SUMMARY: "Adicionar produto ao carrinho",
    DESCRIPTION: "Insere um novo produto no carrinho do usuário.",
    RESPONSE_DESCRIPTION: "Carrinho atualizado com o produto adicionado.",
  },

  FIND_BY_USER_ID: {
    SUMMARY: "Buscar carrinho do usuário",
    DESCRIPTION:
      "Retorna o carrinho atual do usuário logado. Retorna 204 se o carrinho não existir.",
    RESPONSE_DESCRIPTION: "Dados do carrinho ou resposta vazia (204).",
  },

  CLEAR: {
    SUMMARY: "Limpar carrinho",
    DESCRIPTION: "Remove todos os produtos do carrinho do usuário.",
    RESPONSE_DESCRIPTION: "Resultado da exclusão dos itens do carrinho.",
  },

  DELETE_PRODUCT: {
    SUMMARY: "Remover produto do carrinho",
    DESCRIPTION: "Remove um produto específico do carrinho do usuário.",
    RESPONSE_DESCRIPTION: "Resultado da exclusão do produto.",
  },

  UPDATE_PRODUCT: {
    SUMMARY: "Atualizar produto no carrinho",
    DESCRIPTION:
      "Atualiza as informações de um produto no carrinho (como quantidade).",
    RESPONSE_DESCRIPTION: "Carrinho atualizado após a modificação do produto.",
  },

  DTO: {
    INSERT_CART: {
      PRODUCT_ID: {
        DESCRIPTION: "ID do produto que será adicionado ao carrinho",
        EXAMPLE: 123,
      },
      AMOUNT: {
        DESCRIPTION: "Quantidade do produto a ser adicionada",
        EXAMPLE: 2,
      },
    },

    UPDATE_CART: {
      PRODUCT_ID: {
        DESCRIPTION: "ID do produto que será atualizado no carrinho",
        EXAMPLE: 123,
      },
      AMOUNT: {
        DESCRIPTION: "Nova quantidade do produto no carrinho",
        EXAMPLE: 5,
      },
    },

    RETURN_CART: {
      ID: {
        DESCRIPTION: "ID do carrinho",
        EXAMPLE: 1,
      },
      CART_PRODUCT: {
        DESCRIPTION: "Lista de produtos no carrinho",
      },
    },
  },
};
