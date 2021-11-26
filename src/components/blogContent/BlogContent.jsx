// @sanity/block-content-to-react
import BlockContent from '@sanity/block-content-to-react';

// @src/components/blogContent
import BlockCode from './BlockCode';
import BlockImage from './BlockImage';
import YoutubeVideo from './YoutubeVideo';

const serializers = {
  types: {
    exampleUsage: ({ node = {} }) => {
      const { code, language, filename } = node;
      if (!code) {
        return null;
      }

      return (
        <BlockCode language={language} filename={filename}>
          {code}
        </BlockCode>
      );
    },

    image: (props) => {
      const {
        node: { asset, caption, attribution, position },
      } = props;

      return (
        <BlockImage
          source={asset.url}
          caption={caption}
          attribution={attribution}
          position={position}
        />
      );
    },

    youtube: ({ node }) => {
      const { url } = node;

      return <YoutubeVideo url={url} />;
    },
  },
};

const BlogContent = ({ content }) => {
  return content ? (
    <BlockContent
      blocks={content}
      serializers={serializers}
    />
  ) : null;
};

export default BlogContent;
