// @next/
import Head from 'next/head';

// @swr
import { SWRConfig } from 'swr';

// @mui/material

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// @mui/icons-material
import SaveIcon from '@mui/icons-material/Save';

import MainLayout from '../../src/layouts/MainLayout';
import { blogSlugsQuery } from '../../src/lib/sanity/queries/article';

import BlogArticle from '../../src/components/blog/BlogArticle';
import BlogComments from '../../src/components/blog/BlogComments';
import useArticle from '../../src/hooks/useArticle';

import urlFor from '../../src/lib/sanity/urlFor';
import RelevantArticles from '../../src/components/article/RelevantArticles';
import { useRouter } from 'next/router';
import LoadingButton from '@mui/lab/LoadingButton';
import SanityCDNReadClient from '../../src/lib/sanity/clients/SanityCDNReadClient';
import {
  getArticleCommentsOnPage,
  getArticleDetailsBySlug,
  getArticlePageDataBySlug,
  listRelevantArticlesByArticleId,
} from '../../src/lib/sanity/queries/article';
import { COMMENT_PAGE_LIMIT } from '../../src/lib/sanity/queries/constants';

const BlogPostPageContent = () => {
  const { article } = useArticle();
  return (
    <>
      <Head>
        <title key="title">
          {article?.title} | Blog | Voxydev
        </title>
        <meta
          name="description"
          key="description"
          content={article?.excerpt}
        />
        <meta
          name="keywords"
          key="keywords"
          content={article?.keywords}
        />
        /** Facebook share */
        <meta
          property="og:url"
          key="og:url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/blog/${article?.slug}`}
        />
        <meta
          property="og:type"
          key="og:type"
          content="article"
        />
        <meta
          property="og:title"
          key="og:title"
          content={article?.title}
        />
        <meta
          property="og:description"
          key="og:description"
          content={article?.excerpt}
        />
        <meta
          property="og:image"
          key="og:image"
          content={
            article
              ? urlFor(article?.imageCover)
                  .width(480)
                  .height(360)
                  .fit('max')
                  .url()
              : '#'
          }
        />
        <meta
          property="og:image:secure_url"
          content={
            article
              ? urlFor(article.imageCover)
                  .width(480)
                  .height(360)
                  .fit('max')
                  .url()
              : '#'
          }
        />
        <meta property="og:image:width" content="480" />
        <meta property="og:image:height" content="360" />
        <meta
          property="og:image:type"
          content="image/png"
        />
        <meta
          property="og:image:alt"
          content={article?.title}
        />
      </Head>
      <Container
        sx={{
          position: 'relative',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <BlogArticle />

            <BlogComments />
          </Grid>

          <Grid item xs={12} lg={4}>
            <RelevantArticles />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const BlogPostPage = ({ fallback }) => {
  const router = useRouter();

  if (router.isFallback)
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoadingButton
          loading
          loadingPosition="start"
          size="large"
          startIcon={<SaveIcon />}
        >
          Loading...
        </LoadingButton>
      </Container>
    );

  return (
    <SWRConfig
      value={{
        fallback,
      }}
    >
      <BlogPostPageContent />
    </SWRConfig>
  );
};

BlogPostPage.getLayout = (page) => (
  <MainLayout>{page}</MainLayout>
);

export const getStaticProps = async ({ params }) => {
  const { slug } = params;

  console.log(process.env.NODE_ENV);
  console.log(`Fetcing article slug: ${slug}`);

  const { comments, relevantArticles, ...article } =
    await SanityCDNReadClient.fetch(
      getArticlePageDataBySlug({ slug })
    );

  console.log('DEBUG article');

  // console.log(article);

  if (!article) return { notFound: true };

  return {
    props: {
      fallback: {
        [getArticleDetailsBySlug({ slug })]: article,

        [getArticleCommentsOnPage({
          articleId: article._id,
          page: 1,
          limit: COMMENT_PAGE_LIMIT,
        })]: comments,

        [listRelevantArticlesByArticleId({
          articleId: article._id,
          articleCategories: article.categories.map(
            ({ _id }) => _id
          ),
        })]: relevantArticles,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await SanityCDNReadClient.fetch(
    blogSlugsQuery
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export default BlogPostPage;
