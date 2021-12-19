import { useRouter } from 'next/router';
const useSlug = () => {
  const { query } = useRouter();

  const { slug } = query;

  console.log(slug);

  return slug;
};

export default useSlug;
