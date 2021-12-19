// @props-types
import PropTypes from 'prop-types';

// @next
import Head from 'next/head';
import Script from 'next/script';

// @emotion
import { CacheProvider } from '@emotion/react';

// @src/layouts
import ThemeLayout from '../src/layouts/ThemeLayout';

// @src/lib
import createEmotionCache from '../src/lib/createEmotionCache';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import * as gtag from '../src/lib/googleAnalytics/gtag';
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
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
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
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
