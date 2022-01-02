import Head from 'next/head';
import Container from '@mui/material/Container';

import MainLayout from '../src/layouts/MainLayout';
import VideoList from '../src/components/videos/VideoList';
import SanityCDNReadClient from '../src/lib/sanity/clients/SanityCDNReadClient';
import { listVideosOnPage } from '../src/lib/sanity/queries/video';
import { VIDEO_PAGE_LIMIT } from '../src/lib/sanity/queries/CONSTANTS';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';
import PageFallbackLoader from '../src/components/progress/PageFallbackLoader';

const VideosPageContent = () => {
  return (
    <>
      <Head>
        <title key="title">YouTube videos - Voxydev</title>
        <meta
          name="description"
          key="description"
          content="Videos which I uploaded to my youtube channel - VoxyDev to share tips about MUI (Material-UI) and Next.js."
        />
        <meta
          name="keywords"
          key="keywords"
          content="Videos, Youtube Channel, VoxyDev,MUI, Material UI V5, Nextjs, Reactjs, JavaScript, Web Development, Tutorials, Tien H. Vo"
        />
        /** Facebook share */
        <meta
          property="og:url"
          key="og:url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/videos`}
        />
        <meta
          property="og:type"
          key="og:type"
          content="article"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Youtube Videos - VoxyDev"
        />
        <meta
          property="og:description"
          key="og:description"
          content="Videos which I uploaded to my youtube channel - VoxyDev to share tips about MUI (Material-UI) and Next.js."
        />
        <meta
          property="og:image"
          key="og:image"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/video_page.png`}
        />
        <meta
          property="og:image:secure_url"
          key="og:image:secure_url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/video_page.png`}
        />
        <meta property="og:image:width" content="480" />
        <meta property="og:image:height" content="360" />
        <meta
          property="og:image:type"
          content="image/png"
        />
        <meta
          property="og:image:alt"
          content="Youtube Videos - VoxyDev"
        />
      </Head>

      <Container maxWidth="md">
        <VideoList />
      </Container>
    </>
  );
};

const VideosPage = ({ fallbackData }) => {
  const router = useRouter();

  if (router.isFallback) return <PageFallbackLoader />;

  return (
    <SWRConfig value={{ fallbackData }}>
      <VideosPageContent />
    </SWRConfig>
  );
};

VideosPage.getLayout = (page) => (
  <MainLayout>{page}</MainLayout>
);

export default VideosPage;

export const getStaticProps = async () => {
  const firstPageData = await SanityCDNReadClient.fetch(
    listVideosOnPage({
      page: 1,
      limit: VIDEO_PAGE_LIMIT,
    })
  );

  return {
    revalidate:
      process.env.NODE_ENV === 'production' ? 10 : false,
    props: {
      fallbackData: [firstPageData],
    },
  };
};
