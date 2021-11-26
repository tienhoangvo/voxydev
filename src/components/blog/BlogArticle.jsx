// @mui/material
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';

// @next
import { useRouter } from 'next/router';

// @src/components
import Link from '../Link';
import BlogContent from '../blogContent/BlogContent';

// @src/lib/utils
import timeAgoFormat from '../../lib/utils/timeAgoFormat';
import urlFor from '../../lib/sanity/urlFor';

// @src/hooks
import useArticle from '../../hooks/useArticle';

// @src/components
import HeartButton from '../hearts/HeartButton';
import ShareButton from '../share/ShareButton';

const BlogArticle = () => {
  const { query } = useRouter();

  const { slug } = query;

  const { article } = useArticle({ slug });

  if (!article) return null;

  return (
    <Card
      elevation={0}
      sx={{
        borderLeft: 10,
        borderColor: 'secondary.light',

        bgcolor: (theme) =>
          theme.palette.background.secondary,
      }}
    >
      <CardHeader
        title={article?.title}
        titleTypographyProps={{
          component: 'h1',
          variant: 'h4',
        }}
        sx={{
          borderBottom: 1,
          borderColor: (theme) =>
            theme.palette.background.secondary,
        }}
        subheader={timeAgoFormat(article?.publishedAt)}
        titleTypographyProps={{
          fontSize: { xs: '1.4rem' },
        }}
      />
      <CardHeader
        title={article?.author?.name}
        avatar={
          <Avatar
            src={article?.author?.avatar}
            alt={article?.author?.name}
          />
        }
        titleTypographyProps={{
          component: Link,
          href: `/authors/${article?.author?.name}`,
          variant: 'subtitle2',
          sx: {
            textDecoration: 'none',
            color: 'inherit',
          },
        }}
      />
      <CardMedia
        sx={{
          height: 0,
          paddingTop: '50%',
          border: 1,
          borderColor: (theme) =>
            theme.palette.background.secondary,
        }}
        image={urlFor(article?.imageCover)
          .height(400)
          .url()}
        title={article?.title}
      />
      <CardContent
        sx={{
          letterSpacing: 0,
          p: 3,
          overflow: 'hidden',
        }}
      >
        <BlogContent content={article?.content} />
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <HeartButton
          defaultHeartsQuantity={article?.heartsQuantity}
          articleId={article?._id}
          hearts={article?.hearts}
        />

        <ShareButton />
      </CardActions>
    </Card>
  );
};

export default BlogArticle;
