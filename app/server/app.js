require("dotenv").config();
const express = require("express");
const next = require("next");
const helmet = require("helmet");
const compression = require("compression");
const csrf = require("csurf");
const morgan = require("morgan");
const asyncHandler = require("express-async-handler");

const APP_PORT = process.env.APP_PORT || 9000;
const APP_HOST = process.env.APP_HOST || "127.0.0.1";
const dev = process.env.NODE_ENV !== "production";

const api = require("../services");
const redis = require("./redis");
const withRedirect = require("./withRedirect");
const applySecurity = require("./secure");
const routes = require("./routes");
const Authorization = require("./authorization");
const trailing = require("./trailingSlash");

const app = next({ dev });
const handler = routes.getRequestHandler(app);


app.prepare().then(() => {
  const server = express();
  const csrfProtection = csrf({ cookie: false });

  if (!dev) {
    server.set("trust proxy", 1);
  }

  server.use(helmet());
  server.use(compression());
  server.use(morgan("tiny"));
  server.use(redis());
  server.use(withRedirect());
  server.use(trailing());
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.get("/", (req, res, continuation) => {
    const accessToken = Authorization(req).getAccessToken();
    if (!accessToken) return continuation();
    return withRedirect(null, "/dashboard")(req, res, continuation);
  });

  server.post("/authentication", asyncHandler(async (req, res, continuation) => {
    const { email, password } = req.body;
    const redirect = req.body.next ? `?next=${req.body.next}` : "";
    const goTo = "/".concat(redirect);
    if (!email || !password) return withRedirect(null, goTo)(req, res, continuation);

    try {
      api.resource = "/login";
      const auth = await api.post({
        body: { email, password }
      });
      await Authorization(req).setAuth(auth);
      return withRedirect(null, "/dashboard")(req, res, continuation);
    } catch (error) {
      console.error(error);
      return withRedirect(error)(req, res, continuation);
    }
  }));

  server.get("/logout", asyncHandler(async (req, res, continuation) => {
    try {
      await req.session.destroy();
      return withRedirect(null, "/")(req, res, continuation);
    } catch (error) {
      console.log("this is error in logout", error);
      return withRedirect(error)(req, res, continuation);
    }
  }));

  const apps = applySecurity(server);
  routes.routes.forEach((route) => {
    apps(route);
  });

  server.get("*", csrfProtection, (req, res) => handler(req, res));

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
