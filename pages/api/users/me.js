import authenticate from '../../../src/lib/middlewares/authenticate';

const currentUserHandler = (req, res) => {
  switch (req.method) {
    case 'GET': {
      return getCurrentUser(req, res);
    }

    default: {
      console.log(req.method);
      res.status(404).json({
        message: `Cannot find ${req.method} ${req.url}`,
      });
    }
  }
};

const getCurrentUser = async (req, res) => {
  res.status(200).json(req.currentUser);
};

export default authenticate(currentUserHandler);
