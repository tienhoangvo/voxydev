// @mui/material
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// @mui/icons-material
import ReadMoreIcon from '@mui/icons-material/ReadMore';

import Link from './../../Link';
// @src/constants

import useOwner from '../../../hooks/useOwner';
import SanityBlockContent from '@sanity/block-content-to-react';
import urlFor from '../../../lib/sanity/urlFor';
import SocialMediaButton from '../../utils/SocialMediaButton';

const AuthorCard = () => {
  const { owner } = useOwner();

  return (
    <Card
      elevation={0}
      sx={{
        borderLeftWidth: { xs: 5, md: 10 },
        p: { xs: 2, md: 3 },
        borderLeftStyle: 'solid',
        borderLeftColor: 'primary.light',
        bgcolor: (theme) =>
          theme.palette.background.primary,
      }}
    >
      <CardHeader
        sx={{
          flexDirection: {
            xs: 'column',
            md: 'row-reverse',
          },
          textAlign: { xs: 'center', md: 'left' },
          p: 0,
          mb: { xs: 2, md: 3 },
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
              height: { xs: '5rem', md: '10rem' },
              width: { xs: '5rem', md: '10rem' },
              borderWidth: { xs: 3, md: 5 },
              borderStyle: 'solid',
              borderColor: 'primary.light',
              bgcolor: 'divider',
            }}
          />
        }
        titleTypographyProps={{
          component: 'h1',
          sx: {
            fontSize: (theme) => ({
              xs: theme.typography.h5.fontSize,
              md: theme.typography.h3.fontSize,
            }),
          },
        }}
        subheaderTypographyProps={{
          component: 'p',
          variant: 'caption',

          sx: {
            fontSize: { xs: '1rem', md: '1.1rem' },
          },
        }}
      />
      <CardContent
        sx={{
          mt: 1,
          p: 0,

          ['& p']: {
            m: 0,
            color: 'text.primary',
          },
        }}
      >
        <Grid container>
          <Grid item xs={12} md={10} lg={8}>
            {owner && (
              <SanityBlockContent blocks={owner.bio} />
            )}
          </Grid>
          <Grid item xs={false} md={2} lg={4} />
        </Grid>
      </CardContent>
      <CardActions
        sx={{
          p: 0,
          mt: { xs: 2, md: 3 },

          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
        }}
      >
        <Stack
          flexDirection="row"
          gap={1}
          justifyContent={{
            xs: 'center',
            md: 'start',
          }}
          alignItems="center"
          sx={{ width: '100%' }}
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
          sx={{
            width: { xs: '100%', md: 'inherit' },
            mt: { xs: 2, md: 0 },
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
