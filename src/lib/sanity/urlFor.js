import imageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "./config";

const builder = imageUrlBuilder(sanityConfig);
const urlFor = (source) => {
  return builder.image(source);
};

export default urlFor;
