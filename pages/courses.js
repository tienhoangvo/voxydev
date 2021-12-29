// @next
import Head from 'next/head';

// @mui/material
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @src/layouts
import MainLayout from '../src/layouts/MainLayout';

const CoursesPage = () => {
  return (
    <>
      <Head>
        <title key="title">Courses - Voxydev</title>
        <meta
          name="description"
          key="description"
          content="Free courses for Frontend's developers including React, Next.js, MUI and Material UI..."
        />
        <meta
          name="keywords"
          key="keywords"
          content="Free courses, Frontend, React.js, Next.js, MUI, Material UI, Web Development, VoxyDev, Tien Hoang Vo"
        />
        /** Facebook share */
        <meta
          property="og:url"
          key="og:url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/courses`}
        />
        <meta
          property="og:type"
          key="og:type"
          content="website"
        />
        <meta
          property="og:title"
          key="og:title"
          content="Courses - VoxyDev"
        />
        <meta
          property="og:description"
          key="og:description"
          content="Free courses for Frontend's developers including React, Next.js, MUI and Material UI..."
        />
        <meta
          property="og:image"
          key="og:image"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/CoursesPage.png`}
        />
        <meta
          property="og:image:secure_url"
          key="og:image:secure_url"
          content={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/images/CoursesPage.png`}
        />
        <meta property="og:image:width" content="480" />
        <meta property="og:image:height" content="360" />
        <meta
          property="og:image:type"
          content="image/png"
        />
        <meta
          property="og:image:alt"
          content="Courses - VoxyDev"
        />
      </Head>

      <Container maxWidth="md">
        <Typography variant="h2" component="h1">
          Courses
        </Typography>
        <Typography variant="h6" component="h2">
          Comming Soon
        </Typography>
      </Container>
    </>
  );
};

CoursesPage.getLayout = (page) => (
  <MainLayout>{page}</MainLayout>
);

export default CoursesPage;
