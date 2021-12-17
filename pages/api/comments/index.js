import authenticate from '../../../src/lib/middlewares/authenticate';
import { commmentMutations } from '../../../src/lib/sanity/mutations';

const commentsHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST': {
      return createComment(req, res);
    }

    default: {
      res.status(404).json({
        name: 'HttpNotFoundError',
        message: `Cannot find ${req.method} ${req.url}`,
      });
    }
  }
};

const createComment = async (req, res) => {
  const {
    articleId,
    content: commentContent,
    createdAt: commentCreatedAt,
  } = req.body;

  const {
    _id: userId,
    name: userName,
    avatar: userAvatar,
    email: userEmail,
  } = req.currentUser;

  try {
    const response = await commmentMutations.createComment({
      userId,
      userName,
      userAvatar,
      userEmail,
      articleId,
      commentContent,
      commentCreatedAt,
    });

    const [commentData, articleData] =
      response.data.results;

    console.log('commentData', commentData);
    console.log('articleData', articleData);

    res.status(201).json({ _id: commentData.id });
  } catch (error) {
    console.error(error);
    console.dir(error);
    res.status(500).json({
      message:
        'Something went wrong when creating new comment',
      errorMessage: error.message,
      error: error,
    });
  }
};

export default authenticate(commentsHandler);
