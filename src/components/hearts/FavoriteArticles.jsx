// @mui/material
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';

// @mui/icons-material
import FavoriteIcon from '@mui/icons-material/Favorite';
// @swr/infininite
import useSWR from 'swr';

import { useEffect } from 'react';

import { getFavoriteArticles } from '../../lib/sanity/queries';

import LoadingButton from '@mui/lab/LoadingButton';

// @src/components/
import ArticleCard from './../article/ArticleCard';
import useCurrentUser from '../../hooks/useCurrentUser';
import { useRouter } from 'next/router';
import { sanityClientWithoutUseCdn } from '../../lib/sanity/sanity.server';

const FavoriteArticles = () => {
  const router = useRouter();
  const { currentUser, loading: currentUserLoading } =
    useCurrentUser();

  const { data: articles, error } = useSWR(
    getFavoriteArticles({
      currentUserId: currentUser?._id,
    }),
    (query) => sanityClientWithoutUseCdn.fetch(query)
  );

  const loading = !articles && !error;

  useEffect(() => {
    if (currentUserLoading) return;

    if (!currentUser) {
      router.push('/');
    }
  }, [currentUser, currentUserLoading]);

  return (
    <Grid container columnSpacing={3} rowSpacing={4}>
      <CardHeader
        title="Your favorite artiles"
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

      <Grid item xs={12}>
        <LoadingButton
          fullWidth
          disableElevation
          size="large"
          loading={loading}
          variant="contained"
          onClick={(_) => setSize(size + 1)}
          disabled={!loading}
        >
          Loading...
        </LoadingButton>
      </Grid>

      <Grid xs={12} sx={{ mb: 2 }} />
    </Grid>
  );
};

export default FavoriteArticles;
