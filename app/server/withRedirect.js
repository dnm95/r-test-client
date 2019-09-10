const Authorization = require("./authorization");

module.exports = function withRedirect(error, to) {
  let go = to;
  return function GoTo(req, res, next) {
    if (error) return res.redirect("/5xx");
    const accessToken = Authorization(req).getAccessToken();
    const hasredirect = req.method.toLowerCase() === "post" && accessToken;
    const hasNext = req && req.body && req.body.next;

    if (hasredirect && hasNext) {
      go = decodeURIComponent(req.body.next || go);
    }
    if (go) return res.redirect(go);
    next();
  };
};
