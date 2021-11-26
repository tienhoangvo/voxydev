const facebookAuthHandler = (req, res) => {
  if (req.method === 'GET') {
    return handleFacebookAuth(req, res);
  }

  res.status(404).json({
    message: `Cannot find ${req.method} ${req.url}`,
  });
};

const handleFacebookAuth = (req, res) => {
  const facebookURL = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${process.env.FB_APP_ID}&redirect_uri=${process.env.FB_REDIRECT_URI}&scope=public_profile,email`;
  console.log(facebookURL);
  res.redirect(facebookURL);
};

export default facebookAuthHandler;
