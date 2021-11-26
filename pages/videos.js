// @next
import Head from 'next/head';

// @mui/material
import Container from '@mui/material/Container';

// @src/layouts
import MainLayout from '../src/layouts/MainLayout';
import VideoList from '../src/components/videos/VideoList';

// @src/constants
import { BLOG_INDEX_LIMIT } from '../src/constants';
import { getVideosQuery } from '../src/lib/sanity/queries';
import { getClient } from '../src/lib/sanity/sanity.server';

const getPageQuery = (page) => {
  if (page < 0) return null;

  return getVideosQuery({
    start: BLOG_INDEX_LIMIT * (page - 1),
    end: page * BLOG_INDEX_LIMIT - 1,
  });
};
const VideosPage = ({ preview, firstPageData }) => {
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
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/youtube_tutorial.png`}
        />
        <meta
          property="og:image:secure_url"
          key="og:image:secure_url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/youtube_tutorial.png`}
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
        <VideoList firstPageData={firstPageData} />
      </Container>
    </>
  );
};

VideosPage.getLayout = (page) => (
  <MainLayout>{page}</MainLayout>
);

export default VideosPage;

export const getStaticProps = async ({
  preview = false,
}) => {
  const firstPageData = await getClient(preview).fetch(
    getPageQuery(1)
  );
  console.log('FIRST PAGE BLOGS', firstPageData);

  return {
    props: {
      preview,
      firstPageData,
    },
  };
};
