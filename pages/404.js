import Head from 'next/head';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';

import MainLayout from '../src/layouts/MainLayout';

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title key="title">404 Not Found - VoxyDev</title>
        /**FB Share */ /** Facebook share */
        <meta
          property="og:url"
          key="og:url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}`}
        />
        <meta
          property="og:type"
          key="og:type"
          content="article"
        />
        <meta
          property="og:title"
          key="og:title"
          content="404 Page Not Found - VoxyDev"
        />
        <meta
          property="og:description"
          key="og:description"
          content="404 Page Not Found"
        />
        <meta
          property="og:image"
          key="og:image"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/404_not_found.png`}
        />
        <meta
          property="og:image:secure_url"
          key="og:image:secure_url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/404_not_found.png`}
        />
        <meta property="og:image:width" content="480" />
        <meta property="og:image:height" content="360" />
        <meta
          property="og:image:type"
          content="image/png"
        />
        <meta
          property="og:image:alt"
          content="404 Page Not Found - VoxyDev"
        />
      </Head>
      <Container maxWidth="md">
        <Card
          elevation={0}
          sx={{
            borderLeft: 10,
            p: 3,
            borderColor: 'error.light',
            bgcolor: (theme) =>
              theme.palette.background.error,
          }}
        >
          <CardHeader
            title="404: Page Not Found."
            subheader={'This page is eggstinct.'}
            titleTypographyProps={{
              component: 'h1',
              variant: 'h4',
            }}
            subheaderTypographyProps={{
              component: 'p',
              variant: 'subtitle1',

              sx: {
                fontSize: '1.1rem',
              },
            }}
          />
          <CardMedia
            sx={{
              height: 0,
              paddingTop: '56.65%', // 16:9

              bgcolor: 'error.main',
              borderRadius: 10,
            }}
            image={'/images/404_not_found.svg'}
          />
        </Card>
      </Container>
    </>
  );
};

NotFoundPage.getLayout = (page) => (
  <MainLayout>{page}</MainLayout>
);

export default NotFoundPage;
