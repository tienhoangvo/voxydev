import withEditorToken from '../configs/withEditorToken';
import SanityClient from './SanityClient';

const SanityEditClient =
  SanityClient.withConfig(withEditorToken);

export default SanityEditClient;
