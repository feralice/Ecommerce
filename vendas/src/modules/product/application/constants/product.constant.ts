export const PRODUCT = {
  TAG: "Product",
  BEARER_AUTH: true,

  FIND_ALL: {
    SUMMARY: "Listar todos os produtos",
    DESCRIPTION: "Retorna todos os produtos cadastrados no sistema.",
    RESPONSE_DESCRIPTION: "Lista de produtos cadastrados.",
  },

  CREATE: {
    SUMMARY: "Criar produto",
    DESCRIPTION: "Cria um novo produto no sistema.",
    RESPONSE_DESCRIPTION: "Produto criado com sucesso.",
  },

  DELETE: {
    SUMMARY: "Deletar produto",
    DESCRIPTION: "Remove um produto pelo seu ID.",
    RESPONSE_DESCRIPTION: "Produto deletado com sucesso.",
  },

  FIND_BY_ID: {
    SUMMARY: "Buscar produto por ID",
    DESCRIPTION: "Busca e retorna um produto pelo seu ID.",
    RESPONSE_DESCRIPTION: "Informações do produto encontrado.",
  },

  UPDATE: {
    SUMMARY: "Atualizar produto",
    DESCRIPTION: "Atualiza as informações de um produto existente pelo seu ID.",
    RESPONSE_DESCRIPTION: "Produto atualizado com sucesso.",
  },

  DTO: {
    CREATE_PRODUCT: {
      CATEGORY_ID: {
        DESCRIPTION: "ID da categoria associada ao produto",
        EXAMPLE: 1,
      },
      NAME: {
        DESCRIPTION: "Nome do produto",
        EXAMPLE: "Smartphone XYZ",
      },
      PRICE: {
        DESCRIPTION: "Preço do produto",
        EXAMPLE: 1299.99,
      },
      IMAGE: {
        DESCRIPTION: "URL da imagem do produto",
        EXAMPLE: "https://site.com/imagem.png",
      },
    },

    UPDATE_PRODUCT: {
      CATEGORY_ID: {
        DESCRIPTION: "ID da categoria associada ao produto",
        EXAMPLE: 1,
      },
      NAME: {
        DESCRIPTION: "Nome do produto atualizado",
        EXAMPLE: "Smartphone XYZ - Edição Especial",
      },
      PRICE: {
        DESCRIPTION: "Preço atualizado do produto",
        EXAMPLE: 1499.99,
      },
      IMAGE: {
        DESCRIPTION: "URL atualizada da imagem do produto",
        EXAMPLE: "https://site.com/imagem-nova.png",
      },
    },

    PRODUCT_RESPONSE: {
      ID: {
        DESCRIPTION: "ID do produto",
        EXAMPLE: 10,
      },
      NAME: {
        DESCRIPTION: "Nome do produto",
        EXAMPLE: "Smartphone XYZ",
      },
      PRICE: {
        DESCRIPTION: "Preço do produto",
        EXAMPLE: 1299.99,
      },
      IMAGE: {
        DESCRIPTION: "Imagem do produto",
        EXAMPLE: "https://site.com/imagem.png",
      },
      CATEGORY: {
        DESCRIPTION: "Categoria associada ao produto",
      },
    },
  },
};
