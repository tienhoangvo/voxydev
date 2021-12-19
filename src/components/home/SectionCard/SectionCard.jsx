// @mui/material
import Card from '@mui/material/Card';

import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import useMediaQuery from '@mui/material/useMediaQuery';

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

  const matchedSmDown = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );

  return (
    <Card
      elevation={0}
      sx={{
        borderLeft: matchedSmDown ? 5 : 10,
        borderColor:
          href === '/videos'
            ? 'video.main'
            : 'secondary.light',
        p: matchedSmDown ? 2 : 3,
        bgcolor: (theme) =>
          href === '/videos'
            ? theme.palette.background.video
            : theme.palette.background.secondary,
      }}
    >
      <CardHeader
        sx={{ alignItems: 'flex-start' }}
        title={title}
        avatar={
          matchedSmDown ? undefined : (
            <Avatar
              sx={{
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
          )
        }
        subheader={description}
        titleTypographyProps={{
          component: 'h2',
          variant: matchedSmDown ? 'h6' : 'h4',
          mb: matchedSmDown ? 1 : 2,
        }}
        subheaderTypographyProps={{
          align: 'left',
          variant: 'body1',
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
            borderRadius: (theme) =>
              theme.shape.borderRadius,
            overflow: 'hidden',
          }}
          title={`My ${about}`}
        />
      </CardActionArea>

      <CardActions sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color={href === '/videos' ? 'video' : 'secondary'}
          disableElevation
          endIcon={<ExploreIcon />}
          size="large"
          sx={{
            ml: 'auto',
            fontWeight: 'bold',
          }}
          component={Link}
          noLinkStyle
          href={href}
          fullWidth={matchedSmDown}
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default SectionCard;
