import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

// @next
import { useRouter } from 'next/router';

// @src/components
import CommentList from '../comments/CommentList/CommentList';

// @src/hooks
import useArticle from '../../hooks/useArticle';
import CurrentUserComments from '../comments/CurrentUserComments/CurrentUserComments';

const BlogComments = () => {
  const { query } = useRouter();

  const { slug } = query;

  const { article } = useArticle({
    slug,
  });

  return (
    <Card
      elevation={0}
      sx={{
        borderLeft: 10,
        borderColor: 'primary.light',

        bgcolor: (theme) =>
          theme.palette.background.primary,
        mt: 3,
        p: 0,
      }}
    >
      <CardHeader
        sx={{ p: 1 }}
        title={`${article?.commentsQuantity || 0} Comments`}
        titleTypographyProps={{
          sx: {
            fontSize: { xs: '14px', md: '16px' },
            fontWeight: 700,
          },
        }}
      />

      <CardContent sx={{ p: 0 }}>
        <CurrentUserComments articleId={article?._id} />

        <CommentList articleId={article?._id} />
      </CardContent>
    </Card>
  );
};

export default BlogComments;
