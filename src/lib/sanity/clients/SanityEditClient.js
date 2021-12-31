import { createClient } from 'next-sanity';
import withEditorToken from '../configs/withEditorToken';

const SanityEditClient = createClient(withEditorToken);

export default SanityEditClient;
