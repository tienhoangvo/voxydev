// @props-types
import PropTypes from 'prop-types';

// @next
import Head from 'next/head';

// @emotion
import { CacheProvider } from '@emotion/react';

// @src/layouts
import ThemeLayout from '../src/layouts/ThemeLayout';

// @src/lib
import createEmotionCache from '../src/lib/createEmotionCache';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Loading - VoxyDev</title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeLayout>
        {getLayout(<Component {...pageProps} />)}
      </ThemeLayout>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
