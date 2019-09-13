require("dotenv").config();
const express = require("express");
const next = require("next");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const asyncHandler = require("express-async-handler");
const cookieParser = require("cookie-parser");

const APP_PORT = process.env.APP_PORT || 9000;
const APP_HOST = process.env.APP_HOST || "127.0.0.1";
const dev = process.env.NODE_ENV !== "production";

const api = require("../services");
const withRedirect = require("./withRedirect");
const applySecurity = require("./secure");
const routes = require("./routes");
const Authorization = require("./authorization");

const app = next({ dev });
const handler = routes.getRequestHandler(app);


app.prepare().then(() => {
  const server = express();

  if (!dev) {
    server.set("trust proxy", 1);
  }

  server.use(helmet());
  server.use(compression());
  server.use(morgan("tiny"));
  server.use(cookieParser());
  server.use(withRedirect());
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
    const goTo = "/login".concat(redirect);
    if (!email || !password) return withRedirect(null, goTo)(req, res, continuation);

    try {
      api.resource = "/login";
      const auth = await api.post({
        body: { email, password }
      });

      await Authorization(req, res).setAuth(auth);
      return withRedirect(null, "/dashboard")(req, res, continuation);
    } catch (error) {
      console.error(error);
      return withRedirect(error)(req, res, continuation);
    }
  }));

  server.get("/logout", asyncHandler(async (req, res, continuation) => {
    try {
      res.cookie("token", "", { expires: new Date() });
      res.cookie("user", "", { expires: new Date() });
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
