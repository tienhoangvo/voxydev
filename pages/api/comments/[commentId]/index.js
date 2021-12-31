import authenticate from '../../../../src/lib/auth/authenticate';
import { writeClient } from '../../../../src/lib/sanity/sanity.server';
import { commentMutations } from '../../../../src/lib/sanity/mutations';
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

  console.log({ commentId });

  const { _id: userId } = req.currentUser;

  try {
    const comment = await writeClient.getDocument(
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

    // Delete all replies

    const articleId = comment.article._ref;

    console.log(articleId);

    const response = await commentMutations.deleteComment({
      commentId,
      articleId,
    });

    console.log('🔁 RESPONSE DATA', response.data.results);

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
