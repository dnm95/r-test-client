module.exports = (req, res) => ({
  getAccessToken() {
    return req && req.cookies && req.cookies.token;
  },

  async setAuth(auth) {
    res.cookie('token', auth.token, { maxAge: 900000, httpOnly: false });
    res.cookie('user', JSON.stringify({ email: auth.email, role: auth.role }), { maxAge: 900000, httpOnly: false });
  }
});
