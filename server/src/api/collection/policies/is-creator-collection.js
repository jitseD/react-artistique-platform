const { errors } = require("@strapi/utils");
const { ApplicationError } = errors;

module.exports = async (policyContext, config, { strapi }) => {
  const { body, params } = policyContext.request;
  const { user } = policyContext.state;

  console.log("body", body);
  // Return an error if there is no authenticated user with the request
  if (!user) {
    console.log("no user");
    return false;
  }
  /**
    Queries the Cheeses collection type
    using the Entity Service API
    to retrieve information about the collections's creator.
   */
  const [collection] = await strapi.entityService.findMany("api::collection.collection", {
    filters: {
      id: params.id,
    },
    populate: ["creator"],
  });
  console.log("collection found", collection);
  if (!collection) {
    return false;
  }

  if (user.id != collection?.creator?.id) {
    /**
      Throws a custom policy error
      instead of just returning false
      (which would result into a generic Policy Error).
     */
    console.log("policy error");
    const error = new ApplicationError(
      "Only the creator of the collection can perform this action.",
      {
        policy: "is-creator-collection",
        errCode: "COLLECTION_CREATOR",
      }
    );
    error.name = "CreatorCollectionError";
    throw error;
  }

  return true;
};
