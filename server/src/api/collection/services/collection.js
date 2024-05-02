'use strict';

/**
 * collection service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::collection.collection", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const { body } = ctx.request;

    const newCollection = await strapi.entityService.create("api::collection.collection", {
      data: {
        ...body.data,
        creator: {
          set: [user.id],
        },
      },
    });

    return { data: newCollection };
  },
}))
