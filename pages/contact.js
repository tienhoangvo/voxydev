// @next
import Head from 'next/head';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

// @mui/material/icons-material

// @src/layouts
import MainLayout from '../src/layouts/MainLayout';
import ContactForm from '../src/components/contact/ContactForm/ContactForm';
import SocialMediaContact from '../src/components/contact/SocialMediaContact';
import { getOwnerQuery } from '../src/lib/sanity/queries';
import sanityFetcher from '../src/lib/sanity/fetcher';
import { SWRConfig } from 'swr';

const Contact = () => {
  return (
    <>
      <Head>
        <title key="title">Contact - Voxydev</title>
        <meta
          name="description"
          key="description"
          content="Contact Tien Hoang Vo (the admin of VoxyDev) for work"
        />
        <meta
          name="keywords"
          key="keywords"
          content="Contact, Tien Hoang Vo, Voxydev, MUI, Material UI, Nextjs, Material UI V5, Blog, VoxyDev"
        />
        /** Facebook share */
        <meta
          property="og:url"
          key="og:url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/contact`}
        />
        <meta
          property="og:type"
          key="og:type"
          content="article"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Contact - VoxyDev"
        />
        <meta
          property="og:description"
          key="og:description"
          content="Contact Tien Hoang Vo (the admin of VoxyDev) for work"
        />
        <meta
          property="og:image"
          key="og:image"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/contact.png`}
        />
        <meta
          property="og:image:secure_url"
          key="og:image:secure_url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/contact.png`}
        />
        <meta property="og:image:width" content="480" />
        <meta property="og:image:height" content="360" />
        <meta
          property="og:image:type"
          content="image/png"
        />
        <meta
          property="og:image:alt"
          content="Contact - VoxyDev"
        />
      </Head>

      <Container maxWidth="md">
        <Stack spacing={2}>
          <SocialMediaContact />
          <ContactForm />

          <Toolbar />
        </Stack>
      </Container>
    </>
  );
};

const ContactPage = ({ fallback }) => {
  return fallback ? (
    <SWRConfig value={{ fallback }}>
      <Contact />
    </SWRConfig>
  ) : null;
};

ContactPage.getLayout = (page) => (
  <MainLayout>{page}</MainLayout>
);

export default ContactPage;

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
