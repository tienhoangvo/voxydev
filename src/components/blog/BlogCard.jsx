// @react
import { useCallback } from 'react';

// @mui/material
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

// @mui/icons-material
import ReadMoreIcon from '@mui/icons-material/ReadMore';

// @src/components
import Link from './../Link';

// @src/lib/utils
import timeAgoFormat from '../../lib/utils/timeAgoFormat';

import sliceString from '../../lib/utils/sliceString';
import urlFor from '../../lib/sanity/urlFor';

const BlogCard = ({ blog }) => {
  const matchedSmDown = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );
  const demoBlog = {
    title: 'Blog Title Demo',
    author: {
      name: 'Tien ',
      avatar:
        'https://avatars.dicebear.com/api/male/tienhoangvo.svg',
    },
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat, modi! Repellendus est tempora pariatur minima vitae illo, temporibus corrupti impedit aut sequi quidem tempore voluptatum, placeat commodi doloribus? Perferendis, doloribus.',
    imageCover: '/images/blog-title-demo.jpeg',
    slug: 'blog-title-demo',
    createdAt: new Date().toString(),
  };
  const {
    title,
    author,
    subheader,
    imageCover,
    slug,
    createdAt,
  } = blog || demoBlog;

  const renderSubheader = useCallback(() => {
    if (!subheader) return 'No excerpt';

    return matchedSmDown
      ? sliceString({ text: subheader, maxlength: 115 })
      : sliceString({ text: subheader, maxlength: 175 });
  }, [matchedSmDown, subheader]);
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: (theme) =>
          theme.palette.background.secondary,
        borderLeft: 4,
        borderColor: 'secondary.light',
        p: 1,
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <CardActionArea
            sx={{ height: '100%' }}
            component={Link}
            noLinkStyle
            href={`/blog/${slug}`}
          >
            <Box
              sx={{ height: '100%', position: 'relative' }}
            >
              <CardMedia
                image={urlFor(imageCover).height(200).url()}
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
            </Box>
          </CardActionArea>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <CardHeader
            sx={{ alignItems: 'flex-start' }}
            title={
              title.length > 60
                ? `${title.slice(0, 60)}...`
                : title
            }
            subheader={
              <>
                <Typography
                  variant="body2"
                  component={'strong'}
                  fontSize={12}
                  fontWeight={500}
                  letterSpacing={0}
                >
                  {author?.name}
                </Typography>
                <Box
                  component="span"
                  fontSize={20}
                  sx={{
                    margin: '0 4px',
                    letterSpacing: 0,
                  }}
                >
                  •
                </Box>
                <Typography
                  variant="body2"
                  component={'span'}
                  fontSize={12}
                  letterSpacing={0}
                >
                  {timeAgoFormat(
                    new Date(
                      createdAt || new Date.toString()
                    )
                  )}
                </Typography>
              </>
            }
            avatar={
              <Avatar
                src={
                  author
                    ? urlFor(author.avatar)
                        .height(50)
                        .width(50)
                        .url()
                    : '#'
                }
                alt={author?.name || 'A'}
                sx={{
                  bgcolor: (theme) =>
                    theme.palette.background.primary,
                  border: 3,
                  borderColor: 'secondary.main',
                }}
              />
            }
            titleTypographyProps={{
              sx: {
                letterSpacing: 0,
              },
            }}
            subheaderTypographyProps={{}}
          />
          <CardContent>
            <Typography
              variant="caption"
              sx={{
                color: (theme) =>
                  theme.palette.text.secondary,
                letterSpacing: 0,
              }}
            >
              {renderSubheader()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              disableElevation
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<ReadMoreIcon />}
              component={Link}
              noLinkStyle
              href={`/blog/${slug}`}
            >
              Read
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BlogCard;
