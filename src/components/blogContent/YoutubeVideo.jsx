import YouTube from 'react-youtube';
import { useMemo } from 'react';
import getYouTubeID from 'get-youtube-id';

const YoutubeVideo = ({ url = '', videoId = '' }) => {
  const id = useMemo(() => {
    if (videoId) return videoId;

    return getYouTubeID(url);
  }, [url, videoId]);

  return (
    <YouTube
      opts={{
        width: '100%',
        playerVars: {
          autoplay: 0,
          origin: process.env.NEXT_PUBLIC_WEB_APP_URL,
        },
      }}
      videoId={id}
    />
  );
};

export default YoutubeVideo;
