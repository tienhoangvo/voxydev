// @mui/material
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

// @mui/icons-material
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// @swr/infininite

import LoadingButton from '@mui/lab/LoadingButton';

// @src/components/
import VideoListItem from './VideoListItem';
import useVideos from '../../hooks/useVideos';
import { useMediaQuery } from '@mui/material';

const VideoList = ({ firstPageData = [] }) => {
  const {
    videoPages,
    error,
    isLoadingMore,
    isReachingEnd,
    onLoadMore,
  } = useVideos({ firstPageData });

  const matchedSmDown = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );

  return (
    <Grid container columnSpacing={3} rowSpacing={4}>
      {videoPages.map((videos) =>
        videos?.map((video) => (
          <Grid item xs={12} key={video._id}>
            {' '}
            <VideoListItem video={video} />
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
              fullWidth={matchedSmDown}
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

export default VideoList;
