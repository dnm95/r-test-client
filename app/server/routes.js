const nextRoutes = require("next-routes");

const routes = nextRoutes();

routes
  .add("home", "/", "home")
  .add("login", "/login", "home")
  .add("secure.dashboard", "/dashboard", "dashboard")
  .add("secure.employee.detail", "/employee/:id", "employee");

module.exports = routes;
