import axios from 'axios';
import sendAccessTokenViaCookie from '../../../../src/lib/auth/sendAccessTokenViaCookie';
import signAccessToken from '../../../../src/lib/auth/signAccessToken';
import { userByFacebookIdOrEmail } from '../../../../src/lib/sanity/queries';
import { writeClient } from '../../../../src/lib/sanity/sanity.server';

import cookies from './../../../../src/lib/middlewares/cookies';

const facebookCallbackHandler = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      return handleFacebookCallback(req, res);
    }

    default: {
      res.status(404).json({
        message: `Cannot find ${req.method} ${req.url}`,
      });
    }
  }
};

const handleFacebookCallback = async (req, res) => {
  const { code } = req.query;

  const accessTokenUrl = `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${process.env.FB_APP_ID}&redirect_uri=${process.env.FB_REDIRECT_URI}&client_secret=${process.env.FB_APP_SECRET}&code=${code}`;

  const { data: accessTokenData } = await axios.get(
    accessTokenUrl
  );

  console.log({ accessTokenData });

  const { access_token } = accessTokenData;
  console.log({ access_token });

  const userDataUrl = `https://graph.facebook.com/me?access_token=${access_token}&fields=id,name,picture.width(700).hight(700),name_format,first_name,last_name,email`;

  const { data: profile } = await axios.get(userDataUrl);

  console.log(profile);

  let user;

  console.log(
    `-Fetching user with the email ${profile.email} or facebookId ${profile.id}`
  );
  user = await writeClient.fetch(userByFacebookIdOrEmail, {
    email: profile.email,
    facebookId: profile.id,
  });

  console.log('-Fetched user', user);

  if (user) {
    console.log('-User has signed up already!');

    if (user.facebookId) {
      console.log(
        '-User has connected to Facebook acount:',
        user.facebookId
      );
      console.log('-Loging user in...');
    }

    if (!user.facebookId) {
      console.log(
        '-User has not conntected to Facebook account!'
      );
      console.log(
        '-Connecting user to facebook account with FacebookId',
        profile.id
      );

      user = await writeClient
        .patch(user._id)
        .set({
          facebookId: profile.id,
        })
        .commit();

      console.log(
        '-User has connected to his facebook account!',
        user
      );
      console.log('-Loging user in...');
    }
  }

  const newUser = profile.email
    ? {
        _type: 'user',
        name: profile.name,
        facebookId: profile.id,
        avatar: profile.picture.data.url,
        email: profile.email,
        status: 'active',
      }
    : {
        _type: 'user',
        name: profile.name,
        facebookId: profile.id,
        avatar: profile.picture.data.url,
        status: 'active',
      };

  if (!user) {
    console.log('NOT EXIST, CREATE MEW USER');
    user = await writeClient.create(newUser);
  }

  console.log('Debug User', user);

  const token = signAccessToken(user._id);
  sendAccessTokenViaCookie(token, req, res);

  res.redirect('/');
};

export default cookies(facebookCallbackHandler);
