import {
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from 'next-sanity';
import defaultConfig from './configs/defaultConfig';
import readWithCdn from './configs/readWithCdn';

export const imageBuilder = createImageUrlBuilder({
  ...defaultConfig,
  ...readWithCdn,
});

export const urlForImage = (source) =>
  imageBuilder.image(source).auto('format').fit('max');

export const usePreviewSubscription =
  createPreviewSubscriptionHook(sanityConfig);
