"use strict";

/**
 * artwork controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::artwork.artwork", ({ strapi }) => ({
  /**
   * As the controller action is named
   * exactly like the original `create` action provided by the core controller,
   * it overwrites it.
   */
  async create(ctx) {
    // Creates the new artwork using a service
    const newArtwork = await strapi.service("api::artwork.artwork").create(ctx);
    const sanitizedArtwork = await this.sanitizeOutput(newArtwork, ctx);
    ctx.body = sanitizedArtwork;
  },
}));
