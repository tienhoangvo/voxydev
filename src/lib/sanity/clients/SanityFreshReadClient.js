import SanityClient from './SanityClient';
import readWithoutCdn from '../configs/readWithoutCdn';

const SanityFreshReadClient =
  SanityClient.withConfig(readWithoutCdn);

export default SanityFreshReadClient;
