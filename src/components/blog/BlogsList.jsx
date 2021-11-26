// @src/components/
import BlogCard from './BlogCard';

import Grid from '@mui/material/Grid';
// @mui/lab

import LoadingButton from '@mui/lab/LoadingButton';

import useArticles from '../../hooks/useArticles';

const BlogsList = ({ firstPageData = [] }) => {
  const {
    articlePages,
    onLoadMore,
    isLoadingMore,
    isReachingEnd,
    onLoadMore,
  } = useArticles({ firstPageData });

  return (
    <Grid container columnSpacing={3} rowSpacing={4}>
      {articlePages.map((blogs) =>
        blogs?.map((blog) => (
          <Grid item xs={12} key={blog._id}>
            {' '}
            <BlogCard blog={blog} />
          </Grid>
        ))
      )}

      <Grid item xs={12}>
        <LoadingButton
          disableElevation
          size="large"
          loading={isLoadingMore}
          variant="contained"
          onClick={onLoadMore}
          disabled={isLoadingMore || isReachingEnd}
        >
          Load more
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default BlogsList;
