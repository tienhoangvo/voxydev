// @react/
import { useCallback, useEffect, useState } from 'react';

// @mui/material
import LinearProgress from '@mui/material/LinearProgress';

// @next
import Router from 'next/router';
import * as gtag from './../../lib/googleAnalytics/gtag';

const PageLoadingBar = () => {
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    let timerId;

    const handleRouteChange = (url) => {
      gtag.pageview(url);

      timerId = setTimeout(() => {
        setPageLoading(false);
      }, 300);
    };

    Router.events.on('routeChangeStart', (url) => {
      if (timerId) {
        clearTimeout(timerId);
      }

      setPageLoading(true);
    });

    Router.events.on(
      'routeChangeComplete',
      handleRouteChange
    );

    return () => {
      clearTimeout(timerId);
      Router.events.off(
        'routeChangeComplete',
        handleRouteChange
      );
    };
  }, [Router.events]);

  const renderTopLoadingBar = useCallback(() => {
    return pageLoading ? (
      <LinearProgress
        sx={{
          position: 'fixed',
          zIndex: (theme) => theme.zIndex.drawer + 2,
          width: '100%',

          ['& .MuiLinearProgress-bar']: {
            transition: 'none',
          },
        }}
      />
    ) : null;
  }, [pageLoading]);

  return <>{renderTopLoadingBar()}</>;
};

export default PageLoadingBar;
