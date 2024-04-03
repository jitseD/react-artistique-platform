'use strict';

/**
 * artwork service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::artwork.artwork');
