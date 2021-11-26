import useSWRImmutable from 'swr/immutable';
import sanityFetcher from '../lib/sanity/fetcher';
import { getOwnerQuery } from '../lib/sanity/queries';

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
