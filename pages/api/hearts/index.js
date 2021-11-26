import authenticate from '../../../src/lib/middlewares/authenticate';
import { writeClient } from '../../../src/lib/sanity/sanity.server';

const heartsHandler = (req, res) => {
  console.log(`${req.method} ${req.url}`);
  const { method } = req;

  switch (method) {
    case 'POST': {
      return createHeart(req, res);
    }

    case 'DELETE':
      return deleteHeart(req, res);

    default: {
      res.status(404).json({
        name: 'HttpNotFoundError',
        message: `Cannot find ${req.method} ${req.url}`,
      });
    }
  }
};

const createHeart = async (req, res) => {
  const { articleId } = req.query;

  const { _id: userId } = req.currentUser;

  try {
    // Insert user heart
    const article = await writeClient
      .patch(articleId)
      .setIfMissing({
        heartsQuantity: 0,
        hearts: [],
      })
      .inc({
        heartsQuantity: 1,
      })
      .prepend('hearts', [
        {
          _key: userId,
          _type: 'reference',
          _ref: userId,
          _weak: true,
        },
      ])
      .commit();

    res.status(201).json({
      hearts: article.hearts,
      _id: article._id,
      heartsQuantity: article.heartsQuantity,
    });
  } catch (error) {
    res.status(500).json({
      message:
        'Something went wrong when user hearting an article',
      errorMessage: error.message,
      error: error,
    });
  }
};

const deleteHeart = async (req, res) => {
  const { articleId } = req.query;

  const { _id: userId } = req.currentUser;

  try {
    const article = await writeClient
      .patch(articleId)
      .setIfMissing({
        heartsQuantity: 0,
        hearts: [],
      })
      .dec({
        heartsQuantity: 1,
      })
      .unset([`hearts[_key=="${userId}"]`])
      .commit();

    res.status(201).json({
      hearts: article.hearts,
      _id: article._id,
      heartsQuantity: article.heartsQuantity,
    });
  } catch (error) {
    res.status(500).json({
      message:
        'Something went wrong when user UNHEART an article',
      errorMessage: error.message,
      error: error,
    });
  }
};

export default authenticate(heartsHandler);
