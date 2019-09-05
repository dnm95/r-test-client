const nextRoutes = require("next-routes");

const routes = nextRoutes();

routes
  .add("home", "/", "home/containers")
  .add("login", "/login", "account/containers/Login")
  .add("secure.account", "/account", "account/containers")
  .add("secure.account.order.id", "/account/orders/:orderId", "account/containers/Order.id");

module.exports = routes;
