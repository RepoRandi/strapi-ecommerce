"use strict";

/**
 * payment-callback controller
 */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::payment-callback.payment-callback",
  ({ strapi }) => ({
    async create(ctx) {
      let requestData = ctx.request.body;

      let params = {};

      if (requestData.transaction_status == "settlement") {
        params = { data: { orderStatus: "purchased" } };
      } else {
        params = { data: { orderStatus: "cancel" } };
      }

      let updateOrder = await strapi
        .service("api::order.order")
        .update(requestData.order_id, params);

      console.log("update data: ", updateOrder);

      return { data: updateOrder };
    },
  })
);
