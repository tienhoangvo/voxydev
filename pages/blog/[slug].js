// @next/
import Head from 'next/head';

// @swr
import { SWRConfig } from 'swr';

// @mui/material
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// @mui/icons-material
import SaveIcon from '@mui/icons-material/Save';

import MainLayout from '../../src/layouts/MainLayout';
import {
  blogSlugsQuery,
  getArticleBySlugQuery,
  getReleventArticlesByCategories,
} from '../../src/lib/sanity/queries';
import {
  getClient,
  sanityClient,
} from '../../src/lib/sanity/sanity.server';
import BlogArticle from '../../src/components/blog/BlogArticle';
import BlogComments from '../../src/components/blog/BlogComments';
import useArticle from '../../src/hooks/useArticle';
import useSlug from '../../src/hooks/useSlug';
import urlFor from '../../src/lib/sanity/urlFor';
import RelevantArticles from '../../src/components/article/RelevantArticles';
import { useRouter } from 'next/router';
import LoadingButton from '@mui/lab/LoadingButton';

const BlogPostPageContent = () => {
  const slug = useSlug();

  const { article } = useArticle({ slug });

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
              ? urlFor(article.imageCover)
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
      <Stack
        alignItems="center"
        sx={{ width: '100%', position: 'relative' }}
      >
        <Grid container spacing={{ xs: 2, sm: 0 }}>
          <Grid item sm={12} lg={8}>
            <Container maxWidth="md">
              <Stack>
                <BlogArticle />

                <BlogComments />
              </Stack>
            </Container>
          </Grid>

          <Grid item sm={12} lg={4}>
            <Container>
              <RelevantArticles />
            </Container>
          </Grid>
        </Grid>
      </Stack>
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

export const getStaticProps = async ({
  params,
  preview = false,
}) => {
  const { slug } = params;

  console.log(`Fetcing article slug: ${slug}`);

  const article = await getClient(preview).fetch(
    getArticleBySlugQuery(slug)
  );

  if (!article) return { notFound: true };

  console.log(`Succesfully fetched article slug: ${slug}`);

  console.log(
    'Fetching relevant articles',
    getReleventArticlesByCategories({
      slug,
      categories: article.categories.map(({ _id }) => _id),
    })
  );

  const articles = await getClient(preview).fetch(
    getReleventArticlesByCategories({
      slug,
      categories: article.categories.map(({ _id }) => _id),
    }),
    {}
  );
  console.log('Successfully fetch relevant articles');

  return {
    props: {
      fallback: {
        [getArticleBySlugQuery(article.slug)]:
          article || null,

        [getReleventArticlesByCategories({
          slug,
          categories: article.categories.map(
            ({ _id }) => _id
          ),
        })]: articles || [],
      },
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await sanityClient.fetch(blogSlugsQuery);

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export default BlogPostPage;
