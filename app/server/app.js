require("dotenv").config();
const express = require("express");
const next = require("next");
const helmet = require("helmet");
const compression = require("compression");
const csrf = require("csurf");
const morgan = require("morgan");
// const asyncHandler = require("express-async-handler");
const bodyParser = require("body-parser");
// const api = require("../services");

const APP_PORT = process.env.APP_PORT || 9000;
const APP_HOST = process.env.APP_HOST || "127.0.0.1";
const dev = process.env.NODE_ENV !== "production";

// const redis = require("./redis");
const withRedirect = require("./withRedirect");
const cookie = require("./cookie.parser");
const applySecurity = require("./secure");
const routes = require("./routes");
// const GetToken = require("./get.token");

const app = next({ dev });
const handler = routes.getRequestHandler(app);


app.prepare().then(() => {
  const server = express();
  // const csrfProtection = csrf({ cookie: false });

  if (!dev) {
    server.set("trust proxy", 1);
  }

  server.use(helmet());
  server.use(compression());
  server.use(morgan("tiny"));
  // server.use(redis());
  server.use(cookie());
  server.use(withRedirect());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

  /*
  server.get("/login", csrfProtection, (req, res, continuation) => {
    if (!GetToken(req)) return continuation();
    return withRedirect(null, "/")(req, res, continuation);
  });

  server.post("/authentication", csrfProtection, asyncHandler(async (req, res, continuation) => {
    const { email, password } = req.body;
    const redirect = req.body.next ? `?next=${req.body.next}` : "";
    const goTo = "/login".concat(redirect);
    if (!email || !password) return withRedirect(null, goTo)(req, res, continuation);

    try {
      // uncomment after an api was configured
      /* api.resource = "auth";
      const auth = await api.get({ email, password });
      console.info(auth);
      req.session.access_token = Math.random().toString(36).substring(2);
      return await req.session.save(() => withRedirect(null, "/")(req, res, continuation));
    } catch (error) {
      console.error(error);
      return withRedirect(error)(req, res);
    }
  }));

  server.get("/logout", (req, res, continuation) => {
    req.session.access_token = null;
    req.session.destroy((error) => {
      withRedirect(error, "/")(req, res, continuation);
    });
  });
  */

  const apps = applySecurity(server);
  routes.routes.forEach((route) => {
    apps(route);
  });

  server.get("*", (req, res) => handler(req, res));

  server.use(handler).listen(APP_PORT, (error) => {
    if (error) throw error;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://${APP_HOST}:${APP_PORT}`);
  });
}).catch((error) => {
  // eslint-disable-next-line no-console
  console.log(error.stack);
  process.exit(1);
});
