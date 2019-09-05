const cookie = require("cookie-parser");

module.exports = () => cookie(process.env.COOKIE_SECRET_KEY, {
  path: "/",
  secure: process.env.NODE_ENV === "production",
  httpOnly: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24
});
