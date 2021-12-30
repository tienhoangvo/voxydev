// @react
import { useCallback } from 'react';

// @mui/material
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';

// @mui/icons-material
import YouTubeIcon from '@mui/icons-material/YouTube';

// @src/lib/utils

import sliceString from '../../lib/utils/sliceString';
import urlFor from '../../lib/sanity/urlFor';
import timeAgoFormat from '../../lib/utils/timeAgoFormat';

const VideoListItem = ({ video }) => {
  const {
    title,
    excerpt,
    thumbnail,
    video: youtubeVideo,
    _createdAt,
  } = video;

  const renderExcerpt = useCallback(() => {
    if (!excerpt) return 'No excerpt';

    return sliceString({ text: excerpt, maxlength: 200 });
  }, [excerpt]);
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: (theme) => theme.palette.background.video,
        borderLeft: 4,
        borderColor: 'video.light',
        p: 1,
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Box
            sx={{
              height: '100%',
              position: 'relative',
              p: 1,
            }}
          >
            <CardActionArea
              sx={{
                height: '100%',
                borderRadius: '5px',
                overflow: 'hidden',
              }}
              component={'a'}
              target="_blank"
              href={youtubeVideo?.url}
            >
              <CardMedia
                image={urlFor(thumbnail).height(200).url()}
                title={title}
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
            </CardActionArea>{' '}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <CardHeader
            title={title}
            titleTypographyProps={{
              fontSize: '.875rem',
              fontWeight: 700,
            }}
            subheader={timeAgoFormat(new Date(_createdAt))}
            subheaderTypographyProps={{
              fontSize: '12px',
            }}
            sx={{ p: 1 }}
          />
          <CardContent sx={{ p: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: (theme) =>
                  theme.palette.text.secondary,
              }}
            >
              {renderExcerpt()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              disableElevation
              fullWidth
              variant="contained"
              color="video"
              startIcon={<YouTubeIcon />}
              component={'a'}
              target="_blank"
              href={youtubeVideo?.url}
            >
              Watch
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default VideoListItem;
