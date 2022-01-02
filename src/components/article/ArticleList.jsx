// @mui/material
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

// @mui/icons-material
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// @mui/lab
import LoadingButton from '@mui/lab/LoadingButton';

// @src/components/
import ArticleCard from './ArticleCard';
import useArticles from '../../hooks/useArticles';

const ArticleList = () => {
  const {
    articlePages,
    error,
    isLoadingMore,
    isReachingEnd,
    onLoadMore,
  } = useArticles();

  return (
    <Grid container columnSpacing={3} rowSpacing={4}>
      {articlePages.map((articles) =>
        articles?.map((article) => (
          <Grid item xs={12} key={article._id}>
            <ArticleCard article={article} />
          </Grid>
        ))
      )}

      <Grid item xs={12}>
        <Card
          elevation={0}
          sx={{ bgcolor: 'transparent', p: 1 }}
        >
          <CardActions
            sx={{
              justifyContent: 'center',
            }}
          >
            <LoadingButton
              sx={{ width: { xs: '100%', md: 'inherit' } }}
              endIcon={<ExpandMoreIcon />}
              disableElevation
              size="large"
              loading={isLoadingMore}
              variant="contained"
              onClick={onLoadMore}
              color="primary"
              sx={{ fontWeight: 700 }}
              disabled={isLoadingMore || isReachingEnd}
            >
              Load more
            </LoadingButton>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sx={{ height: '2rem' }} />
    </Grid>
  );
};

export default ArticleList;
