"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const midtransClient = require("midtrans-client");

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    // @ts-ignore
    const result = await super.create(ctx);

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-eG3dnEMDh4LhnpzRks_KBq64",
      clientKey: "SB-Mid-client-5hON8IjDIxaFTs4c",
    });

    let parameter = {
      transaction_details: {
        order_id: result.data.id,
        gross_amount: result.data.attributes.totalPrice,
      },
      credit_card: {
        secure: true,
      },
    };

    let response = await snap.createTransaction(parameter);

    return response;
  },
}));
