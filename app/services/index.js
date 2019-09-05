const Api = require("./api");

let service = null;
const api = (() => {
  if (service) return service;
  service = new Api();
  return service;
})();

module.exports = api;
