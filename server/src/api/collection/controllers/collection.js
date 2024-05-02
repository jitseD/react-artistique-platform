"use strict";

/**
 * collection controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::collection.collection", ({ strapi }) => ({
  /**
   * As the controller action is named
   * exactly like the original `create` action provided by the core controller,
   * it overwrites it.
   */
  async create(ctx) {
    // Creates the new collection using a service
    const newCollection = await strapi.service("api::collection.collection").create(ctx);
    const sanitizedCollection = await this.sanitizeOutput(newCollection, ctx);
    ctx.body = sanitizedCollection;
  },
}));
