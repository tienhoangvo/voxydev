import { useRouter } from "next/router";
const useSlug = () => {
  const { query } = useRouter();

  const { slug } = query;

  return slug;
};

export default useSlug;
