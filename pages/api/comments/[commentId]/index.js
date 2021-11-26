import authenticate from '../../../../src/lib/middlewares/authenticate';
import { writeClient } from '../../../../src/lib/sanity/sanity.server';

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
    const comment = await writeClient.getDocument(
      commentId
    );

    if (!comment) {
      return res.status(404).json({
        message: `There is no comment with ID: ${commentId}`,
      });
    }

    if (comment.user._ref !== userId) {
      return res.status(401).json({
        message: 'The comment does not belong to you!',
      });
    }

    // Delete all replies

    if (comment.replies && comment.replies.length > 0) {
      const deleteRepliesData = Promise.all(
        comment.replies.map((reply) =>
          writeClient.delete(reply._ref)
        )
      );

      await deleteRepliesData;
    }

    const deletedData = await writeClient.delete(commentId);

    const deletedComment = deletedData.results[0].document;

    await writeClient
      .patch(comment.article._ref)
      .unset([`comments[_key=="${deletedComment._id}"]`])
      .dec({
        commentsQuantity: 1,
      })
      .commit();

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
