import authenticate from '../../../../src/lib/auth/authenticate';
import SanityEditClient from '../../../../src/lib/sanity/clients/SanityEditClient';
import { deleteAComment } from '../../../../src/lib/sanity/mutations/comment';

const commentHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'DELETE': {
      return deleteComment(req, res);
    }

    default: {
      res.status(404).json({
        message: `Cannot find ${req.method} ${req.url}`,
      });
    }
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.query;
  const { _id: userId } = req.currentUser;

  try {
    const comment = await SanityEditClient.getDocument(
      commentId
    );

    console.log(comment);

    if (!comment) {
      return res.status(404).json({
        message: `There is no comment with ID: ${commentId}`,
      });
    }

    if (comment.user.ref._ref !== userId) {
      return res.status(401).json({
        message: 'The comment does not belong to you!',
      });
    }

    const articleId = comment.article._ref;

    await deleteAComment({
      commentId,
      articleId,
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'success',
      errorMessage: error.message,
      error: error,
    });
  }
};

export default authenticate(commentHandler);
