import IconButton from '@mui/material/IconButton';

// @mui/icons-material
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useMemo } from 'react';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
const SocialMediaButton = ({
  siteName,
  username,
  profileURL,
  fontSize = 'medium',
}) => {
  const renderedIcon = useMemo(() => {
    if (siteName === 'Facebook')
      return <FacebookIcon fontSize={fontSize} />;

    if (siteName === 'YouTube')
      return <YouTubeIcon fontSize={fontSize} />;

    if (siteName === 'Twitter')
      return <TwitterIcon fontSize={fontSize} />;

    if (siteName === 'GitHub')
      return <GitHubIcon fontSize={fontSize} />;

    if (siteName === 'LinkedIn')
      return <LinkedInIcon fontSize={fontSize} />;

    return 'Unknown Icon Name';
  }, [siteName]);

  return (
    <IconButton
      title={siteName}
      target="_blank"
      color={siteName?.toLowerCase()}
      rel="noopener"
      component="a"
      sx={{
        border: 2,
        borderColor: siteName?.toLowerCase(),
      }}
      href={profileURL}
    >
      {renderedIcon}
    </IconButton>
  );
};

export default SocialMediaButton;
