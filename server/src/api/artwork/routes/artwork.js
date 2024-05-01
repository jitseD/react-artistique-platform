'use strict';

/**
 * artwork router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter("api::artwork.artwork", {
  config: {
    update: {
      //auth: false, // set the route to bypass the normal Strapi authentication system
      policies: ["is-creator-artwork"], // set the route to use a custom policy
      middlewares: [],
    },
  },
});
