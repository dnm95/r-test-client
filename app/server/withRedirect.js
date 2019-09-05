const GetToken = require("./get.token");

module.exports = function withRedirect(error, to) {
  return function GoTo(req, res, next) {
    if (error) return res.redirect("/5xx");
    const has_redirect = req.method.toLowerCase() === "post" && GetToken(req);
    if (has_redirect) {
      to = decodeURIComponent(req.body.next || to);
    }
    if (to) return res.redirect(to);
    next();
  };
};
