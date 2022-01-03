import SanityClient from './SanityClient';
import readWithCdn from '../configs/readWithCdn';

const SanityCDNReadClient =
  SanityClient.withConfig(readWithCdn);

export default SanityCDNReadClient;
