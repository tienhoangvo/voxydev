import {
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from 'next-sanity';
import defaultConfig from './configs/defaultConfig';
import readWithCdn from './configs/readWithCdn';

const sanityConfig = {
  ...defaultConfig,
  ...readWithCdn,
};

export const imageBuilder =
  createImageUrlBuilder(sanityConfig);

export const urlForImage = (source) =>
  imageBuilder.image(source).auto('format').fit('max');

export const usePreviewSubscription =
  createPreviewSubscriptionHook(sanityConfig);
