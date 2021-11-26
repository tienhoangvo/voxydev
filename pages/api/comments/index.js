import authenticate from '../../../src/lib/middlewares/authenticate';
import { writeClient } from '../../../src/lib/sanity/sanity.server';

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
  const { articleId, content, createdAt } = req.body;

  const { _id: userId, name, avatar } = req.currentUser;

  try {
    const comment = await writeClient.create({
      _type: 'comment',
      user: {
        _type: 'reference',
        _ref: userId,
      },
      article: {
        _type: 'reference',
        _ref: articleId,
      },
      content,
      createdAt,
      repliesQuantity: 0,
      userData: {
        id: userId,
        name,
        avatar,
      },
    });

    await writeClient
      .patch(articleId)
      .setIfMissing({
        commentsQuantity: 0,
        comments: [],
      })
      .inc({
        commentsQuantity: 1,
      })
      .prepend('comments', [
        {
          _key: comment._id,
          _type: 'reference',
          _ref: comment._id,
          _weak: true,
        },
      ])
      .commit();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message:
        'Something went wrong when creating new comment',
      errorMessage: error.message,
      error: error,
    });
  }
};

export default authenticate(commentsHandler);
