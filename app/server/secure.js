const Authorization = require("./authorization");

module.exports = (server) => (route) => (server.get(
  route.pattern,
  (req, res, next) => {
    const accessToken = Authorization(req).getAccessToken();
    const isSecure = route.name.toLowerCase().includes("secure.");

    if (!isSecure) return next();
    if (accessToken) return next();
    return res.redirect(`/?next=${req.originalUrl}`);
  },
  (req, res, next) => next()
));
