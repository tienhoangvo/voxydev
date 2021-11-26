import GoogleOAuth2Client from '../../../../src/lib/auth/GoogleOAuth2Client';
import sendAccessTokenViaCookie from '../../../../src/lib/auth/sendAccessTokenViaCookie';
import signAccessToken from '../../../../src/lib/auth/signAccessToken';
import cookies from '../../../../src/lib/middlewares/cookies';
import {
  userByGoogleId,
  userByGoogleIdOrEmail,
} from '../../../../src/lib/sanity/queries';
import { writeClient } from '../../../../src/lib/sanity/sanity.server';

const googleCallbackHandler = async (req, res) => {
  if (req.method === 'GET') {
    return handleGoogleCallback(req, res);
  }

  res.status(404).json({
    message: `Cannot find ${req.method} ${req.url}`,
  });
};

const handleGoogleCallback = async (req, res) => {
  const { code } = req.query;
  console.log(code);
  const { tokens } = await GoogleOAuth2Client.getToken(
    code
  );

  GoogleOAuth2Client.setCredentials(tokens);

  const url =
    'https://www.googleapis.com/oauth2/v3/userinfo';
  const { data: profile } =
    await GoogleOAuth2Client.request({
      url,
    });

  console.log('Google Data', profile);

  const {
    name,
    email,
    picture: avatar,
    sub: googleId,
  } = profile;

  let user;

  console.log(
    `-Fetching user with the email ${profile.email} or googleId ${profile.sub}`
  );

  user = await writeClient.fetch(userByGoogleIdOrEmail, {
    googleId,
    email,
  });

  console.log('-Fetched user', user);

  if (user) {
    console.log('-User has signed up already!');

    if (user.googleId) {
      console.log(
        '-User has connected to google acount:',
        user.googleId
      );
      console.log('-Loging user in...');
    }

    if (!user.googleId) {
      console.log(
        '-User has not conntected to google account!'
      );
      console.log(
        '-Connecting user to google account with googleId',
        profile.sub
      );

      user = await writeClient
        .patch(user._id)
        .set({
          googleId: profile.sub,
        })
        .commit();

      console.log(
        '-User has connected to his google account!',
        user
      );
      console.log('-Loging user in...');
    }
  }

  if (!user) {
    console.log('NOT EXIST, CREATE MEW USER');
    user = await writeClient.create({
      _type: 'user',
      name,
      email,
      avatar,
      googleId,
      status: 'active',
    });
  }

  console.log('Debug User', user);

  const token = signAccessToken(user._id);
  sendAccessTokenViaCookie(token, req, res);

  res.redirect('/');
};

export default cookies(googleCallbackHandler);
