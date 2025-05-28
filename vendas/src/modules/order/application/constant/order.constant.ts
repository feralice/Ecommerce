export const ORDER = {
  TAG: "Order",
  BEARER_AUTH: true,

  CREATE: {
    SUMMARY: "Criar pedido",
    DESCRIPTION: "Cria um novo pedido a partir dos dados fornecidos.",
    RESPONSE_DESCRIPTION: "Pedido criado com sucesso.",
  },

  DTO: {
    CREATE_ORDER: {
      ADDRESS_ID: {
        DESCRIPTION: "ID do endereço de entrega associado ao pedido",
        EXAMPLE: 1,
      },
      AMOUNT_PAYMENTS: {
        DESCRIPTION: "Quantidade de parcelas para o pagamento",
        EXAMPLE: 3,
      },
      CODE_PIX: {
        DESCRIPTION: "Código gerado para pagamento via Pix",
        EXAMPLE: "pix-001-abc123",
      },
      DATE_PAYMENT: {
        DESCRIPTION: "Data do pagamento (formato ISO 8601)",
        EXAMPLE: "2025-05-27T12:00:00Z",
      },
    },
  },
};
