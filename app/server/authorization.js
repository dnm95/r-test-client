module.exports = (req) => ({
  getAccessToken() {
    return req && req.session && req.session.accessToken;
  },

  async setAuth(auth) {
    req.session.accessToken = auth.token;
    req.session.user = { email: auth.email, role: auth.role };
    return req.session.save();
  }
});
