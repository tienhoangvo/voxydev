import imageUrlBuilder from '@sanity/image-url';
import defaultConfig from './configs/defaultConfig';
import readWithCdn from './configs/readWithCdn';

const sanityConfig = {
  ...defaultConfig,
  ...readWithCdn,
};
const builder = imageUrlBuilder(sanityConfig);
const urlFor = (source) => {
  return builder.image(source);
};

export default urlFor;
