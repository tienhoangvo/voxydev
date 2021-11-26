import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

import urlFor from '../../lib/sanity/urlFor';
import Link from '../Link';
const RelevantArticleCard = ({ article }) => {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: (theme) =>
          theme.palette.background.primary,

        borderTop: 2,
        mb: 2,
        borderColor: 'secondary.light',
      }}
    >
      <CardActionArea
        component={Link}
        noLinkStyle
        href={`/blog/${article.slug}`}
      >
        <CardHeader
          title={article?.title}
          subheader={article?.author?.name}
          avatar={
            <Avatar
              src={
                article.author
                  ? urlFor(article.author.avatar)
                      .height(50)
                      .width(50)
                      .url()
                  : '#'
              }
              alt={article.author?.name || 'A'}
              sx={{
                bgcolor: (theme) =>
                  theme.palette.background.primary,
                border: 3,
                borderColor: 'secondary.main',
              }}
            />
          }
          titleTypographyProps={{
            fontWeight: 700,
          }}
          subheaderTypographyProps={{
            fontSize: '.7rem',
          }}
        />

        <CardMedia
          image={urlFor(article.imageCover)
            .height(200)
            .url()}
          title={article.title}
          sx={{
            height: '100%',
            paddingTop: '56.25%',
            position: 'relative',
            borderRadius: '5px',
            filter: 'grayscale(50%)',
            transition: 'filter .2s ease',
            opacity: 0.95,
          }}
        />
      </CardActionArea>
    </Card>
  );
};

export default RelevantArticleCard;
