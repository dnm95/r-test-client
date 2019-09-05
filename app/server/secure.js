const GetToken = require("./get.token");

module.exports = server => (route) => {
  server.get(
    route.pattern,
    (req, res, next) => {
      const access_token = GetToken(req);
      if (access_token) {
        res.cookie("access_token", access_token);
      } else {
        res.clearCookie("access_token");
      }

      const should_be_secure = route.name.toLowerCase().includes("secure.");
      if (!should_be_secure) return next();
      if (access_token) return next();
      return res.redirect(`/login?next=${req.originalUrl}`);
    },
    (req, res, next) => next()
  );
};
