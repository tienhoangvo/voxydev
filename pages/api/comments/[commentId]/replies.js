import authenticate from '../../../../src/lib/middlewares/authenticate';
import { writeClient } from '../../../../src/lib/sanity/sanity.server';

const repliesHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST': {
      return createReply(req, res);
    }

    case 'DELETE': {
      return deleteReply(req, res);
    }

    default: {
      res.status(404).json({
        message: `Cannot find ${req.method} ${req.url}`,
      });
    }
  }
};

const createReply = async (req, res) => {
  console.log('req.query', req.query);
  const { commentId } = req.query;

  const { content, createdAt, repliedTo } = req.body;

  const { _id: userId } = req.currentUser;

  try {
    const repliedToUser = await writeClient.getDocument(
      repliedTo
    );

    const reply = await writeClient.create({
      _type: 'reply',
      user: {
        _type: 'reference',
        _ref: userId,
      },

      repliedToUserData: {
        id: repliedToUser._id,
        name: repliedToUser.name,
        avatar: repliedToUser.avatar,
      },

      userData: {
        id: userId,
        name: req.currentUser.name,
        avatar: req.currentUser.avatar,
      },

      comment: {
        _type: 'reference',
        _ref: commentId,
      },
      repliedTo: {
        _type: 'reference',
        _ref: repliedTo,
      },
      content,
      createdAt,
      disaprroved: false,
    });

    await writeClient
      .patch(commentId)
      .setIfMissing({ replies: [], repliesQuantity: 0 })
      .prepend('replies', [
        {
          _type: 'reference',
          _ref: reply._id,
          _weak: true,
          _key: reply._id,
        },
      ])
      .inc({
        repliesQuantity: 1,
      })
      .commit();

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({
      message:
        'Something went wrong when creating new reply',
      errorMessage: error.message,
      error: error,
    });
  }
};

const deleteReply = async (req, res) => {
  const { commentId, replyId } = req.query;

  const { _id: userId } = req.currentUser;

  try {
    const reply = await writeClient.getDocument(replyId);

    if (!reply) {
      return res.status(404).json({
        message: `There is no reply with the ID ${replyId}`,
      });
    }

    if (reply.comment._ref !== commentId) {
      return res.status(403).json({
        message: `The reply - ${replyId} does not belong to the comment - ${commentId}`,
      });
    }

    if (reply.user._ref !== userId) {
      return res.status(403).json({
        message: `The reply - ${replyId} does not belong to you`,
      });
    }

    const deletedData = await writeClient.delete(reply._id);

    const deletedReply = deletedData.results[0].document;

    await writeClient
      .patch(commentId)
      .unset([`replies[_key=="${deletedReply._id}"]`])
      .dec({
        repliesQuantity: 1,
      })
      .commit();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      status: 'success',
      errorMessage: error.message,
      error: error,
    });
  }
};

export default authenticate(repliesHandler);
