import { algoliaClient } from '../../../src/lib/algolia';

const videosWebhookHandler = (req, res) => {
  switch (req.method) {
    case 'POST': {
      return onVideoCreated(req, res);
    }

    case 'DELETE': {
      return onVideoDeleted(req, res);
    }

    default: {
      console.log(req.method);
      res.status(404).json({
        message: `Cannot find ${req.method} ${req.url}`,
      });
    }
  }
};

const onVideoCreated = (req, res) => {
  const videoIndex = algoliaClient.initIndex('videos');

  console.log('ALGOLIA_APP_ID', process.env.ALGOLIA_APP_ID);
  console.log(
    'ALGOLIA_ADMIN_API_KEY',
    process.env.ALGOLIA_ADMIN_API_KEY
  );

  const { _id, _type, title, excerpt, thumbnail, url } =
    req.body;

  console.log('CREATED VIDEO', req.body);

  return videoIndex
    .saveObject({
      objectID: _id,
      type: _type,
      title,
      excerpt,
      thumbnail,
      url,
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

const onVideoDeleted = (req, res) => {
  const videoIndex = algoliaClient.initIndex('videos');

  const { _id, title, excerpt, thumbnail, url } = req.body;

  console.log('DEBUG DELETED VIDEO', req.body);

  return videoIndex
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

export default videosWebhookHandler;
