import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { sanityClientWithoutUseCdn } from '../sanity/sanity.server';

const authenticate = (handler) => async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      name: 'HttpUnauthenticatedError',
      message:
        'You are not logged in! Please log in to access this route!',
    });
  }

  // 2) Verification token

  try {
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const currentUser =
      await sanityClientWithoutUseCdn.getDocument(
        decoded.id
      );

    if (!currentUser) {
      return res.status(401).json({
        name: 'HttpUnauthenticatedError',
        message:
          'The token belonging to this token does no longer exist.',
      });
    }

    req.currentUser = currentUser;

    return handler(req, res);
  } catch (error) {
    if (error.name === 'JsonWebTokenError')
      return res.status(401).json({
        name: 'HttpUnauthenticatedError',
        message: 'Invalid token. Please login again!',
      });
  }
};
export default authenticate;
