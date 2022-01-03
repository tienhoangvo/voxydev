import SanityClient from './SanityClient';
import readWithCdn from '../configs/readWithCdn';

const SanityCDNReadClient =
  SanityClient.withConfig(readWithCdn);

console.log(readWithCdn);
export default SanityCDNReadClient;
