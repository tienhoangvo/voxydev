import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';

import Link from '../Link';
import BlogContent from '../blogContent/BlogContent';

import timeAgoFormat from '../../lib/utils/timeAgoFormat';
import urlFor from '../../lib/sanity/urlFor';

import useArticle from '../../hooks/useArticle';

import HeartButton from '../hearts/HeartButton';
import ShareButton from '../share/ShareButton';
import usePageHits from '../../hooks/usePageHits';

const BlogArticle = () => {
  const { article } = useArticle();

  const pageHits = usePageHits();

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
          fontSize: { xs: '1.4rem' },
        }}
        sx={{
          borderBottom: 1,
          borderColor: (theme) =>
            theme.palette.background.secondary,
        }}
        subheader={`${
          article?.heartsQuantity
        } hearts · ${pageHits} views · ${timeAgoFormat(
          article?.publishedAt
        )}`}
        subheaderTypographyProps={{
          fontWeight: '500',
          letterSpacing: 1,
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
          p: { lg: 3 },
          overflow: 'hidden',
          wordBreak: 'break-word',
          fontSize: '.875rem',
        }}
      >
        <BlogContent content={article?.content} />
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <HeartButton articleId={article._id} />

        <ShareButton
          title={article.title}
          url={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/blog/${article.slug}`}
          hashtags={article.categories.map((c) =>
            c.title.split(' ').join('')
          )}
        />
      </CardActions>
    </Card>
  );
};

export default BlogArticle;
