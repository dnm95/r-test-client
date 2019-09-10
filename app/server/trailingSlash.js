module.exports = function trailing() {
  return function slash(req, res, next) {
    const uri = req.url;
    const rpath = req.path;
    const test = /\?[^]*\//.test(uri);
    if (uri.substr(-1) === "/" && uri.length > 1 && !test) {
      const query = uri.slice(req.path.length);
      res.redirect(301, rpath.slice(0, -1) + query);
    } else {
      next();
    }
  };
};
