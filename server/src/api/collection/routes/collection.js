'use strict';

/**
 * collection router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter("api::collection.collection", {
  config: {
    update: {
      //auth: false, // set the route to bypass the normal Strapi authentication system
      policies: ["is-creator-collection"], // set the route to use a custom policy
      middlewares: [],
    },
  },
});
