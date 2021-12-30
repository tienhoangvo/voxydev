// @react
import { useMemo } from 'react';

// @react-instantsearch-dom
import { connectHits } from 'react-instantsearch-dom';
import ArticleHit from './ArticleHit';

// @src/components/search

import HitNoResult from './HitNoResult';
import VideoHit from './VideoHit';

const Hits = ({ hits, onSearchClose }) => {
  console.log('Hits onSearchClose', onSearchClose);

  const renderedHitItems = useMemo(() => {
    if (hits.length === 0) return <HitNoResult />;

    return hits.map((hit) =>
      hit.type === 'video' ? (
        <VideoHit
          key={hit.objectID}
          hit={hit}
          onSearchClose={onSearchClose}
        />
      ) : (
        <ArticleHit
          key={hit.objectID}
          hit={hit}
          onSearchClose={onSearchClose}
        />
      )
    );
  }, [hits, onSearchClose]);

  return <>{renderedHitItems}</>;
};

const CustomHits = connectHits(Hits);

export default CustomHits;
