require("dotenv").config();

module.exports = (req, res) => ({
  getAccessToken() {
    return req && req.cookies && req.cookies.token;
  },

  async setAuth(auth) {
    res.cookie("token", auth.token, { maxAge: process.env.COOKIE_EXPIRATION, httpOnly: false });
    res.cookie("user", JSON.stringify({ email: auth.email, role: auth.role, id: auth.id }), { maxAge: process.env.COOKIE_EXPIRATION, httpOnly: false });
  }
});
