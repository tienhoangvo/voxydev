const sanityWebhookHandler = (req, res) => {
  switch (req.method) {
    case 'POST': {
      return onArticleCreated(req, res);
    }

    case 'DELETE': {
      return onArticleDeleted(req, res);
    }

    default: {
      console.log(req.method);
      res.status(404).json({
        message: `Cannot find ${req.method} ${req.url}`,
      });
    }
  }
};

const onArticleCreated = (req, res) => {
  res.status(200).json({ status: 'success' });
};

const onArticleDeleted = (req, res) => {
  res.status(200).json({ status: 'success' });
};

export default sanityWebhookHandler;
