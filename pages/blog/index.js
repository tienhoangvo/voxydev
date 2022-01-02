import Head from 'next/head';

import Container from '@mui/material/Container';

import MainLayout from '../../src/layouts/MainLayout';

import ArticleList from '../../src/components/article/ArticleList';

import SanityCDNReadClient from '../../src/lib/sanity/clients/SanityCDNReadClient';
import { listArticlesOnPage } from '../../src/lib/sanity/queries/article';
import { ARTICLE_PAGE_LIMIT } from '../../src/lib/sanity/queries/CONSTANTS';
import { useRouter } from 'next/router';
import PageFallbackLoader from '../../src/components/progress/PageFallbackLoader';
import { SWRConfig } from 'swr';

const BlogPage = ({ fallbackData }) => {
  const router = useRouter();

  if (router.isFallback) return <PageFallbackLoader />;

  return (
    <SWRConfig value={{ fallbackData: fallbackData }}>
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
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/blog_page.png`}
        />
        <meta
          property="og:image:secure_url"
          key="og:image:secure_url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/blog_page.png`}
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
        <ArticleList />
      </Container>
    </SWRConfig>
  );
};

BlogPage.getLayout = (page) => (
  <MainLayout>{page}</MainLayout>
);

export default BlogPage;

export const getStaticProps = async () => {
  const firstArticlePageQuery = listArticlesOnPage({
    page: 1,
    limit: ARTICLE_PAGE_LIMIT,
  });
  const firstPageData = await SanityCDNReadClient.fetch(
    firstArticlePageQuery
  );

  return {
    revalidate:
      process.env.NODE_ENV === 'production' ? 10 : false,
    props: {
      fallbackData: [firstPageData],
    },
  };
};
