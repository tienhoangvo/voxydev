import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';

const PageFallbackLoader = () => {
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
      >
        Loading...
      </LoadingButton>
    </Container>
  );
};

export default PageFallbackLoader;
