import { sanityClient } from "./sanity.server";

const sanityFetcher = (query, options) =>
  options ? sanityClient.fetch(query, options) : sanityClient.fetch(query);

export default sanityFetcher;
