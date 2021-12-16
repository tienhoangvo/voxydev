import useCurrentUser from '../../../hooks/useCurrentUser';
import CreateCommentForm from '../CreateCommentForm/CreateCommentForm';
import CurrentUserCommentList from '../CurrentUserCommentList/CurrentUserCommentList';

const CurrentUserComments = ({ articleId }) => {
  const { currentUser } = useCurrentUser();

  if (!currentUser) return null;

  return (
    <>
      <CreateCommentForm articleId={articleId} />

      <CurrentUserCommentList articleId={articleId} />
    </>
  );
};

export default CurrentUserComments;
