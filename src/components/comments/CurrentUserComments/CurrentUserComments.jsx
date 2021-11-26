import CreateCommentForm from '../CreateCommentForm/CreateCommentForm';
import CurrentUserCommentList from '../CurrentUserCommentList/CurrentUserCommentList';

const CurrentUserComments = ({ articleId }) => {
  return (
    <>
      <CreateCommentForm articleId={articleId} />

      <CurrentUserCommentList articleId={articleId} />
    </>
  );
};

export default CurrentUserComments;
