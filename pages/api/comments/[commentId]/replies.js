import authenticate from '../../../../src/lib/middlewares/authenticate';
import { replyMutations } from '../../../../src/lib/sanity/mutations';
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

  console.log(req.body);
  const {
    _id: userId,
    name: userName,
    avatar: userAvatar,
    email: userEmail,
  } = req.currentUser;

  try {
    const repliedToUser = await writeClient.getDocument(
      repliedTo
    );

    console.log('repliedToUser', repliedToUser);

    const {
      _id: repliedToUserId,
      name: repliedToUserName,
      avatar: repliedToUserAvatar,
      email: repliedToUserEmail,
    } = repliedToUser;

    const response = await replyMutations.createReply({
      commentId,

      userId,
      userName,
      userAvatar,
      userEmail,

      repliedToUserId,
      repliedToUserName,
      repliedToUserAvatar,
      repliedToUserEmail,

      replyContent: content,
      replyCreatedAt: createdAt,
    });

    console.log('REPLY CREATE RESPONSE', response);

    const [replyData, commentData] = response.data.results;

    console.log('REPLY DATA', replyData);

    console.log('COMMENT DATA', commentData);
    const reply = replyData.document;
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
    await replyMutations.deleteReply({
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
