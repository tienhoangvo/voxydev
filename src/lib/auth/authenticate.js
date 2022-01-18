import { getSession } from 'next-auth/react';

const authenticate = (handler) => async (req, res) => {
  console.log('## AUTHENTICATING...');

  const session = await getSession({ req });

  if (!session) {
    console.log('## AUTHENTICATION FAILED...');
    return res.status(401).json({
      name: 'HttpUnauthenticatedError',
      message:
        'You are not logged in! Please log in to access this route!',
    });
  }

  console.log('## AUTHENTICATION SUCCESS...');

  req.currentUser = session;

  return handler(req, res);
};
export default authenticate;
