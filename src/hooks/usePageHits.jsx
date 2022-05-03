import { useEffect } from 'react';
import { useState } from 'react';
import countapi from 'countapi-js';
import useSlug from './useSlug';
const usePageHits = () => {
  const slug = useSlug();

  const [pageHits, setPageHits] = useState(0);

  const fetchPageHits = async () => {
    if (!slug) return;

    try {
      console.log(slug);
      const result = await countapi.visits(`blog-${slug}`);

      console.log(result);

      setPageHits(result.value);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!slug) return;

    fetchPageHits();
  }, [slug]);

  return pageHits;
};

export default usePageHits;
