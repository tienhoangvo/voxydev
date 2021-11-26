import cookies from "../../../src/lib/middlewares/cookies";

const logoutHandler = (req, res) => {
  if (req.method === "GET") {
    return handleLogout(req, res);
  }

  res.status(404).json({
    message: `Cannot find ${req.method} ${req.url}`,
  });
};

const handleLogout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    maxAge: -1,
    path: "/",
  });

  res.end();
};

export default cookies(logoutHandler);
