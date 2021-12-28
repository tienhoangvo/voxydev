// @next/
import Head from 'next/head';

// @mui/material
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

// @src/layouts/
import MainLayout from '../src/layouts/MainLayout';
import AuthorCard from '../src/components/home/AuthorCard/AuthorCard';

// @src/components
import SectionCard from '../src/components/home/SectionCard/SectionCard';

// @src/contants
import { HOME_SECTIONS } from '../src/constants';
import sanityFetcher from '../src/lib/sanity/fetcher';
import { getOwnerQuery } from '../src/lib/sanity/queries';
import { SWRConfig } from 'swr';

const Home = () => {
  return (
    <>
      <Head>
        <title key="title">Home - VoxyDev</title>
        <meta
          name="description"
          key="description"
          content="A personal site of Tien H. Vo, who loves to use and share tips about MUI (Material-UI) and Next.js."
        />
        <meta
          name="keywords"
          key="keywords"
          content="VoxyDev,MUI, Material UI V5, Nextjs, Reactjs, JavaScript, Web Development, Tutorials, Tien H. Vo"
        />
        /** Facebook share */
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
          content="Home - VoxyDev"
        />
        <meta
          property="og:description"
          key="og:description"
          content="A personal site of Tien H. Vo, who loves to use and share tips about MUI (Material-UI) and Next.js."
        />
        <meta
          property="og:image"
          key="og:image"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/personal_website.png`}
        />
        <meta
          property="og:image:secure_url"
          key="og:image:secure_url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/personal_website.png`}
        />
        <meta property="og:image:width" content="480" />
        <meta property="og:image:height" content="360" />
        <meta
          property="og:image:type"
          content="image/png"
        />
        <meta
          property="og:image:alt"
          content="Home - VoxyDev"
        />
      </Head>

      <Container maxWidth="md">
        <Stack spacing={5}>
          <AuthorCard />

          {HOME_SECTIONS.map((section) => (
            <SectionCard
              sectionContent={section}
              key={section.about}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
};

const HomePage = ({ fallback }) => {
  return fallback ? (
    <SWRConfig value={{ fallback }}>
      <Home />
    </SWRConfig>
  ) : null;
};

HomePage.getLayout = (page) => (
  <MainLayout>{page}</MainLayout>
);

export default HomePage;

export const getStaticProps = async () => {
  const query = getOwnerQuery(
    process.env.NEXT_PUBLIC_OWNER_ID
  );

  const owner = await sanityFetcher(query);

  return {
    props: {
      fallback: {
        [query]: owner || null,
      },
    },
  };
};
