import authenticate from '../../../../src/lib/auth/authenticate';
import SanityEditClient from '../../../../src/lib/sanity/clients/SanityEditClient';
import {
  createNewReply,
  deleteAReply,
} from '../../../../src/lib/sanity/mutations/reply';

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
  const { commentId } = req.query;

  const { content, createdAt, repliedTo } = req.body;

  try {
    const repliedToUser =
      await SanityEditClient.getDocument(repliedTo);

    const reply = await createNewReply({
      currentUser: req.currentUser,
      repliedToUser,
      content,
      createdAt,
      commentId,
    });

    res.status(201).json(reply);
  } catch (error) {
    console.error(error);
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
    await deleteAReply({
      replyId,
      commentId,
      userId,
    });

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
