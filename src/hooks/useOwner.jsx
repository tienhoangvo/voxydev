import useSWRImmutable from 'swr/immutable';

import { getOwnerQuery } from '../lib/sanity/queries/user';

import SanityCDNReadClient from '../lib/sanity/clients/SanityCDNReadClient';

const sanityFetcher = (query) =>
  SanityCDNReadClient.fetch(query);
const useOwner = () => {
  const getKey = () => {
    return getOwnerQuery(process.env.NEXT_PUBLIC_OWNER_ID);
  };

  const { data, error } = useSWRImmutable(
    getKey,
    sanityFetcher
  );

  return { owner: data, error };
};

export default useOwner;
