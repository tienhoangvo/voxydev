// @mui/material
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';

// @mui/icons-material
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// @next
import router from 'next/router';

// @react
import { useEffect } from 'react';

// @src/components/
import ArticleCard from './../article/ArticleCard';

import useCurrentUserFavoriteArticles from '../../hooks/useCurrentUserFavoriteArtiles';
import useCurrentUser from '../../hooks/useCurrentUser';

const FavoriteArticles = () => {
  const { currentUser, loading: currentUserLoading } =
    useCurrentUser();

  console.log('debug FavoriteArticles', currentUser);

  const { articles, loading, error } =
    useCurrentUserFavoriteArticles({
      currentUserId: currentUser?._id,
    });

  useEffect(() => {
    if (currentUserLoading) return;

    if (!currentUser) {
      router.push('/');
    }
  }, [currentUser, currentUserLoading]);

  return (
    <Grid container rowSpacing={3}>
      <CardHeader
        title="Your favorite artiles"
        subheader={`You hearted ${
          currentUser?.favoriteArticlesQuantity || 0
        } ones`}
        avatar={
          <Avatar
            sx={{
              color: (theme) => theme.palette.heart.main,
              bgcolor: (theme) =>
                theme.palette.background.secondary,
            }}
          >
            <FavoriteIcon />
          </Avatar>
        }
        titleTypographyProps={{
          variant: 'h6',
          component: 'h1',
        }}
      />
      {articles?.map((article) => (
        <Grid item xs={12} key={article._id}>
          <ArticleCard article={article} />
        </Grid>
      ))}

      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <LoadingButton
          disableElevation
          startIcon={<ExpandMoreIcon />}
          loadingPosition="start"
          size="large"
          loading={loading}
          disabled={articles.length > 0}
          variant="contained"
          onClick={(_) => setSize(size + 1)}
        >
          Loading articles...
        </LoadingButton>
      </Grid>

      <Grid item xs={12} sx={{ mb: 2 }} />
    </Grid>
  );
};

export default FavoriteArticles;
