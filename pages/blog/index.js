// @next/
import Head from 'next/head';

// @mui/material

import Container from '@mui/material/Container';

// @src/layouts/
import MainLayout from '../../src/layouts/MainLayout';

// @src/lib/sanity
import {
  getClient,
  overlayDrafts,
} from '../../src/lib/sanity/sanity.server';
import { getBlogsQuery } from '../../src/lib/sanity/queries';

// @src/components

import ArticleList from '../../src/components/article/ArticleList';

// @src/constants
import { BLOG_INDEX_LIMIT } from '../../src/constants';

const getPageQuery = (page) => {
  if (page < 0) return null;

  return getBlogsQuery({
    start: BLOG_INDEX_LIMIT * (page - 1),
    end: page * BLOG_INDEX_LIMIT - 1,
  });
};

const BlogPage = ({ preview, firstPageData }) => {
  return (
    <>
      <Head>
        <title key="title">Blog - VoxyDev</title>
        <meta
          name="description"
          key="description"
          content="The blog site of VoxyDev where I write articles about MUI and Next.js tips!"
        />
        <meta
          name="keywords"
          key="keywords"
          content="MUI, Material UI, Nextjs, Material UI V5, Blog, VoxyDev"
        />
        /** Facebook share */
        <meta
          property="og:url"
          key="og:url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/blog`}
        />
        <meta
          property="og:type"
          key="og:type"
          content="article"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Blog - VoxyDev"
        />
        <meta
          property="og:description"
          key="og:description"
          content="The blog site of VoxyDev where I write articles about MUI and Next.js tips!"
        />
        <meta
          property="og:image"
          key="og:image"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/BlogPage.png`}
        />
        <meta
          property="og:image:secure_url"
          key="og:image:secure_url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/BlogPage.png`}
        />
        <meta property="og:image:width" content="480" />
        <meta property="og:image:height" content="360" />
        <meta
          property="og:image:type"
          content="image/png"
        />
        <meta
          property="og:image:alt"
          content="Blog - VoxyDev"
        />
      </Head>

      <Container maxWidth="md">
        <ArticleList firstPageData={firstPageData} />
      </Container>
    </>
  );
};

BlogPage.getLayout = (page) => (
  <MainLayout>{page}</MainLayout>
);

export default BlogPage;

export const getStaticProps = async ({
  preview = false,
}) => {
  const firstPageData = overlayDrafts(
    await getClient(preview).fetch(getPageQuery(1))
  );

  console.log('FIRST PAGE BLOGS', firstPageData);

  return {
    props: {
      preview,
      firstPageData,
    },
  };
};
