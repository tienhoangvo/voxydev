import { createClient } from 'next-sanity';
import defaultConfig from '../configs/defaultConfig';

const SanityClient = createClient(defaultConfig);

export default SanityClient;
