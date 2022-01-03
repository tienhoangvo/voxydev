import { useRouter } from 'next/router';

import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';

import RecommendIcon from '@mui/icons-material/Recommend';

import useRelevantArticles from '../../hooks/useRelevantArtiles';
import RelevantArticleCard from './RelevantArticleCard';
import useArticle from '../../hooks/useArticle';

const RelevantArticles = () => {
  const { query } = useRouter();
  const { article } = useArticle({
    slug: query.slug,
  });
  const { articles } = useRelevantArticles();

  const renderedArtiles = articles.map((article) => {
    return (
      <RelevantArticleCard
        article={article}
        key={article._id}
      />
    );
  });

  const renderedCategories = article?.categories?.map(
    (category, index) => {
      return (
        <Chip
          size="small"
          color={index % 2 == 0 ? 'primary' : 'secondary'}
          label={category.title}
          key={category._id}
          sx={{
            fontSize: '.6rem',
            fontWeight: 700,
            mb: 1,
          }}
        />
      );
    }
  );

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: (theme) =>
          theme.palette.background.secondary,
        borderLeft: 10,
        borderColor: 'secondary.light',
        p: 1,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            color="inherit"
            sx={{
              border: 2,
              borderColor: (theme) =>
                theme.palette.primary.main,
              bgcolor: (theme) =>
                theme.palette.background.primary,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            <RecommendIcon />
          </Avatar>
        }
        title="You might also like"
        titleTypographyProps={{
          sx: {
            fontSize: '1rem',
            fontWeight: '700',
          },
        }}
      />

      <CardActions
        sx={{
          p: (theme) => theme.spacing(1, 2, 0),
          flexWrap: 'wrap',
        }}
      >
        {renderedCategories}
      </CardActions>
      <CardContent>{renderedArtiles}</CardContent>
    </Card>
  );
};

export default RelevantArticles;
