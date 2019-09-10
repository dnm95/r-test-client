const axios = require("axios");
const http = require("http");
const https = require("https");
const isEmpty = require("lodash/isEmpty");

const { API_URI } = process.env;
const { API_PORT } = process.env;
const { API_VERSION } = process.env;
const { NODE_ENV } = process.env;
const { NODE_SERVER } = process.env;

const PROTOCOL = ((NODE_ENV === "production" && NODE_SERVER === "production") ? "https" : "http");
const BASE_URL = API_PORT ? `${PROTOCOL}://${API_URI}:${API_PORT}/${API_VERSION}` : `${PROTOCOL}://${API_URI}/${API_VERSION}`;

const MakeHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return { ...headers };
};


const AxiosInstance = (cfg = {}) => {
  const axiosConfig = {
    baseURL: BASE_URL,
    timeout: 1000 * 35,
    responseType: "json",
    headers: MakeHeaders(),
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    transformResponse: [
      (response) => (typeof response === "string" ? JSON.parse(response) : response)
    ],
    ...cfg
  };

  return axios.create(axiosConfig);
};

const responseParser = (response) => response.data;
const errorParser = (err) => {
  let error = err;
  if (err.response && err.response.data) {
    // eslint-disable-next-line prefer-destructuring
    error = err.response.data.error;
  }
  throw error;
};

const AxiosDispatchResponse = (cls, verb, params) => {
  const { body, qs } = params || {};
  const self = cls;
  let parameters = {};
  if (!body && !qs && !isEmpty(params)) {
    parameters.data = params;
  } else if (body) {
    parameters = body;
  } else if (qs) {
    parameters.params = qs;
  }

  if (cls.access_token) {
    axios.defaults.headers.common['Authorization'] = cls.access_token;
  }

  return self.axios_instance[verb](cls.resource.concat("/"), parameters)
    .then(responseParser)
    .catch(errorParser);
};

let that = null;
class ApiRequest {
  constructor() {
    this.resource = null;
    this.access_token = null;
    this.axios_instance = AxiosInstance();
    that = this;
  }

  get(params) {
    return AxiosDispatchResponse(this || that, "get", params);
  }

  put(params) {
    return AxiosDispatchResponse(this || that, "put", params);
  }

  post(params) {
    return AxiosDispatchResponse(this || that, "post", params);
  }

  delete(params) {
    return AxiosDispatchResponse(this || that, "delete", params);
  }
}

module.exports = ApiRequest;
module.exports.AxiosInstance = AxiosInstance;
module.exports.responseParser = responseParser;
module.exports.errorParser = errorParser;
