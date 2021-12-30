import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';

import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import useOwner from '../../hooks/useOwner';
import { useMemo } from 'react';
import SocialMediaButton from '../utils/SocialMediaButton';

const SocialMediaContact = () => {
  const { owner } = useOwner();

  const renderedSocialMediaButtons = useMemo(() => {
    if (!owner) return null;

    return owner.socialMediaSites.map((site) => (
      <SocialMediaButton
        key={site.siteName}
        {...site}
        fontSize={'medium'}
      />
    ));
  }, [owner]);
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: (theme) =>
          theme.palette.background.secondary,
        borderLeft: 10,
        borderColor: 'secondary.light',
        p: 1,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: 'unset',
              color: (theme) =>
                theme.palette.secondary.main,

              borderTop: 3,
              borderBottom: 3,
              borderColor: (theme) =>
                theme.palette.secondary.main,
              mb: { xs: 1, md: 0 },
            }}
          >
            <SentimentVerySatisfiedIcon />
          </Avatar>
        }
        title="Follow me on social media..."
        sx={{
          p: 1,
          borderBottom: 2,
          borderColor: 'divider',
          alignItems: { xs: 'center', md: 'flex-start' },
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
        }}
        subheader={`Wanna make friends with me? I'd love to laugh at your jokes`}
        titleTypographyProps={{
          variant: 'h6',
          component: 'h1',
        }}
      />

      <CardActions>
        {renderedSocialMediaButtons}
      </CardActions>
    </Card>
  );
};

export default SocialMediaContact;
