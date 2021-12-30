// @mui/material
import Card from '@mui/material/Card';

import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';

// @mui/icons-material
import ExploreIcon from '@mui/icons-material/Explore';

// @src/components
import Link from '../../Link';

const SectionCard = ({ sectionContent }) => {
  const {
    about = '',
    title = '',
    image = '',
    description = '',
    href = '/',
  } = sectionContent;

  return (
    <Card
      elevation={0}
      sx={{
        borderLeftWidth: { xs: 5, md: 10 },
        p: { xs: 2, md: 3 },
        borderLeftStyle: 'solid',
        borderLeftColor:
          href === '/videos'
            ? 'video.main'
            : 'secondary.light',

        bgcolor: (theme) =>
          href === '/videos'
            ? theme.palette.background.video
            : theme.palette.background.secondary,
      }}
    >
      <CardHeader
        sx={{
          alignItems: { xs: 'center', md: 'flex-start' },
          flexDirection: { xs: 'column', md: 'row' },
          p: 0,

          mb: { xs: 2, md: 3 },
        }}
        title={title}
        avatar={
          <Avatar
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
              bgcolor: 'primary.light',
              width: '4rem',
              height: '4rem',
              fontWeight: 700,
              fontSize: 30,
            }}
            aria-label={about}
            alt={about}
          >
            {about.charAt(0).toUpperCase()}
          </Avatar>
        }
        subheader={description}
        titleTypographyProps={{
          component: 'h2',
          fontSize: { xs: '1.5rem', md: '2rem' },
          mb: 1,
        }}
        subheaderTypographyProps={{
          align: 'left',
          mt: 1,

          fontSize: { xs: '.875rem', md: '1rem' },
        }}
      />
      <CardActionArea
        component={Link}
        noLinkStyle
        href={href}
      >
        <CardMedia
          image={image}
          sx={{
            height: '200px',
            paddingTop: '50%', // 16:9

            bgcolor:
              href === '/videos'
                ? 'video.main'
                : 'secondary.main',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
          title={`Go to ${about}`}
        />
      </CardActionArea>

      <CardActions sx={{ p: 0, mt: { xs: 2, md: 3 } }}>
        <Button
          variant="contained"
          color={href === '/videos' ? 'video' : 'secondary'}
          disableElevation
          endIcon={<ExploreIcon />}
          size="large"
          sx={{
            ml: 'auto',
            fontWeight: 'bold',
            width: { xs: '100%', md: 'inherit' },
          }}
          component={Link}
          noLinkStyle
          href={href}
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default SectionCard;
