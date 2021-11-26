import GoogleOAuth2Client from "../../../../src/lib/auth/GoogleOAuth2Client";

const googleAuthHandler = (req, res) => {
  if (req.method === "GET") {
    return handleGoogleAuth(req, res);
  }

  res.status(404).json({
    message: `Cannot find ${req.method} ${req.url}`,
  });
};

const handleGoogleAuth = (req, res) => {
  const url = GoogleOAuth2Client.generateAuthUrl({
    scope: ["openid", "email", "profile"],
  });

  console.log("Google Redirect URL", url);

  res.redirect(url);
};

export default googleAuthHandler;
