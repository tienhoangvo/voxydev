import authenticate from '../../../src/lib/auth/authenticate';

import {
  heartArticle,
  unheartArticle,
} from '../../../src/lib/sanity/mutations/heart';

const heartsHandler = (req, res) => {
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

  try {
    // Insert user heart
    const user = await heartArticle({
      articleId,
      currentUser: req.currentUser,
    });

    res.json(user);
  } catch (error) {
    console.error(error);

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

  try {
    // Insert user heart
    const user = await unheartArticle({
      articleId,
      currentUser: req.currentUser,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({
      message:
        'Something went wrong when user hearting an article',
      errorMessage: error.message,
      error: error,
    });
  }
};

export default authenticate(heartsHandler);
