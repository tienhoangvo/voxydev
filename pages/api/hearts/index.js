import authenticate from '../../../src/lib/middlewares/authenticate';
import {
  heartArticle,
  unheartArticle,
} from '../../../src/lib/sanity/mutations';
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

  const {
    _id: userId,
    favoriteArticles: userFavoriteArticles,
    favoriteArticlesQuantity: userFavoriteArticlesQuantity,
  } = req.currentUser;

  try {
    // Insert user heart
    const [userResponse, articleResponse] =
      await heartArticle({
        articleId,
        userId,
        userFavoriteArticles,
        userFavoriteArticlesQuantity,
      });

    console.log('userResponse', userResponse.data);
    console.log('articleResponse', articleResponse.data);

    const user = userResponse.data.results[0].document;
    res.status(201).json(user);
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

const deleteHeart = async (req, res) => {
  const { articleId } = req.query;

  const {
    _id: userId,
    favoriteArticles: userFavoriteArticles,
    favoriteArticlesQuantity: userFavoriteArticlesQuantity,
  } = req.currentUser;

  try {
    // Insert user heart
    const [userResponse, articleResponse] =
      await unheartArticle({
        articleId,
        userId,
        userFavoriteArticles,
        userFavoriteArticlesQuantity,
      });

    console.log('userResponse', userResponse.data);
    console.log('articleResponse', articleResponse.data);

    const user = userResponse.data.results[0].document;
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
