// @mui/material
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';

// @mui/icons-material
import ReadMoreIcon from '@mui/icons-material/ReadMore';

import Link from './../../Link';
// @src/constants

import useOwner from '../../../hooks/useOwner';
import SanityBlockContent from '@sanity/block-content-to-react';
import urlFor from '../../../lib/sanity/urlFor';
import SocialMediaButton from '../../utils/SocialMediaButton';

const AuthorCard = () => {
  const matchedSmDown = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );

  const { owner } = useOwner();

  return (
    <Card
      elevation={0}
      sx={{
        borderLeft: matchedSmDown ? 5 : 10,
        p: matchedSmDown ? 2 : 3,
        borderColor: 'primary.light',
        bgcolor: (theme) =>
          theme.palette.background.primary,
      }}
    >
      <CardHeader
        sx={{
          flexDirection: matchedSmDown
            ? 'column'
            : 'row-reverse',
          textAlign: matchedSmDown ? 'center' : 'left',
        }}
        title={`Hi, I'm ${owner?.name}`}
        subheader={owner?.subheader}
        avatar={
          <Avatar
            src={
              owner
                ? urlFor(owner?.avatar)
                    .width(300)
                    .height(300)
                    .url()
                : '#'
            }
            alt={'User avatar'}
            sx={{
              height: matchedSmDown ? '5rem' : '10rem',
              width: matchedSmDown ? '5rem' : '10rem',
              border: matchedSmDown ? 3 : 5,
              borderColor: 'primary.light',
              bgcolor: 'divider',
              mb: matchedSmDown ? 1 : 0,
            }}
          />
        }
        titleTypographyProps={{
          component: 'h1',
          variant: matchedSmDown ? 'h5' : 'h3',
        }}
        subheaderTypographyProps={{
          component: 'p',
          variant: 'caption',

          sx: {
            fontSize: matchedSmDown ? '1rem' : '1.1rem',
          },
        }}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={10} md={10} lg={8}>
            {owner && (
              <SanityBlockContent blocks={owner.bio} />
            )}
          </Grid>
          <Grid item xs={false} sm={2} md={2} lg={4} />
        </Grid>
      </CardContent>
      <CardActions
        sx={{
          flexDirection: matchedSmDown ? 'column' : 'row',
          justifyContent: 'space-between',
        }}
      >
        <Stack
          flexDirection="row"
          justifyContent={
            matchedSmDown ? 'space-between' : 'start'
          }
          alignItems="center"
        >
          {owner?.socialMediaSites?.map((site) => (
            <SocialMediaButton
              {...site}
              key={site.siteName}
            />
          ))}
        </Stack>

        <Button
          href="/contact"
          component={Link}
          startIcon={<ReadMoreIcon />}
          size="large"
          variant="contained"
          disableElevation
          fullWidth={matchedSmDown}
          sx={{
            mt: matchedSmDown ? 1 : 0,
            fontWeight: 'bold',
          }}
        >
          More
        </Button>
      </CardActions>
    </Card>
  );
};

export default AuthorCard;
