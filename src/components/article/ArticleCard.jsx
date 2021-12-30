// @react
import { useCallback } from 'react';

// @mui/material
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';

// @mui/icons-material
import ReadMoreIcon from '@mui/icons-material/ReadMore';

// @src/components
import Link from './../Link';

// @src/lib/utils
import timeAgoFormat from '../../lib/utils/timeAgoFormat';

import sliceString from '../../lib/utils/sliceString';
import urlFor from '../../lib/sanity/urlFor';

const ArticleCard = ({ article }) => {
  const {
    title,
    author,
    excerpt,
    imageCover,
    slug,
    publishedAt,
  } = article;

  const renderExcerpt = useCallback(() => {
    if (!excerpt) return 'No excerpt';

    return sliceString({ text: excerpt, maxlength: 200 });
  }, [excerpt]);
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
              component={Link}
              noLinkStyle
              href={`/blog/${slug}`}
            >
              <CardMedia
                image={urlFor(imageCover).height(200).url()}
                title={title}
                sx={{
                  height: '100%',
                  paddingTop: '56.25%',
                  position: 'relative',

                  filter: 'grayscale(50%)',
                  transition: 'filter .2s ease',
                  opacity: 0.95,
                }}
              />
            </CardActionArea>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <CardHeader
            sx={{
              alignItems: 'flex-start',
              p: 1,
            }}
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
                >
                  {author?.name}
                </Typography>
                <Box
                  component="span"
                  fontSize={20}
                  sx={{
                    margin: '0 4px',
                  }}
                >
                  •
                </Box>
                <Typography
                  variant="body2"
                  component={'span'}
                  fontSize={12}
                >
                  {timeAgoFormat(
                    new Date(
                      publishedAt || new Date().toString()
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
              fontWeight: 700,
            }}
            subheaderTypographyProps={{}}
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

export default ArticleCard;
