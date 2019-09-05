const nextRoutes = require("next-routes");

const routes = nextRoutes();

routes
  .add("home", "/", "home")
  .add("dashboard", "/dashboard", "dashboard")
  .add("employee.detail", "/employee/:id", "employee")
  .add("secure.account.order.id", "/account/orders/:orderId", "account/containers/Order.id");

module.exports = routes;
