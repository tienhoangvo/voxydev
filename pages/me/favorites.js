// @next/
import Head from 'next/head';

// @mui/material

import Container from '@mui/material/Container';

// @src/layouts/
import MainLayout from '../../src/layouts/MainLayout';

// @src/components

import FavoriteArticles from '../../src/components/hearts/FavoriteArticles';

const BlogPage = () => {
  return (
    <>
      <Head>
        <title key="title">
          My favorite articles - VoxyDev
        </title>
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
      </Head>

      <Container maxWidth="md">
        <FavoriteArticles />
      </Container>
    </>
  );
};

BlogPage.getLayout = (page) => (
  <MainLayout>{page}</MainLayout>
);

export default BlogPage;
