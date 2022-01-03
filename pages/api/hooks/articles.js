import { algoliaClient } from '../../../src/lib/algolia';

const articlesWebhookHandler = (req, res) => {
  switch (req.method) {
    case 'POST': {
      return onArticleCreated(req, res);
    }

    case 'DELETE': {
      return onArticleDeleted(req, res);
    }

    default: {
      res.status(404).json({
        message: `Cannot find ${req.method} ${req.url}`,
      });
    }
  }
};

const onArticleCreated = (req, res) => {
  const articlesIndex = algoliaClient.initIndex('articles');

  const {
    _id,
    _type,
    slug,
    title,
    excerpt,
    imageCover,
    publishedAt,
    heartsQuantity,
  } = req.body;

  return articlesIndex
    .saveObject({
      objectID: _id,
      type: 'article',
      slug,
      title,
      excerpt,
      imageCover,
      publishedAt,
      heartsQuantity,
    })
    .then(() => {
      console.log('✔ SUCCESS');
      console.log(req.body);
      res.status(200).json({ status: 'success' });
    })
    .catch((err) => {
      console.log('💥 ERROR');
      console.error(err);

      res.status(500).json({ status: 'error' });
    });
};

const onArticleDeleted = (req, res) => {
  const articlesIndex = algoliaClient.initIndex('articles');

  const {
    _id,
    slug,
    title,
    excerpt,
    imageCover,
    publishedAt,
    heartsQuantity,
  } = req.body;

  return articlesIndex
    .deleteObject(_id)
    .then((_) => {
      res.status(204).json({ status: 'success' });
    })
    .catch((err) => {
      console.log('💥 ERROR');
      console.error(err);

      res.status(500).json({ status: 'error' });
    });
};

export default articlesWebhookHandler;
