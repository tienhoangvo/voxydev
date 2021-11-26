const sendAccessTokenViaCookie = (token, req, res) => {
  const secure = process.env.NODE_ENV === "production";
  res.cookie("jwt", token, {
    maxAge: process.env.COOKIE_MAXAGE * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure,
    path: "/",
    sameSite: "strict",
  });
};

export default sendAccessTokenViaCookie;
