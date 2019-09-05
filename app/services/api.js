const axios = require("axios");
const http = require("http");
const https = require("https");

const { API_URI } = process.env;
const { API_PORT } = process.env;
const { API_VERSION } = process.env;
const PROTOCOL = process.env.NODE_ENV === "production" ? "https" : "http";
const BASE_URL = `${PROTOCOL}://${API_URI}:${API_PORT}/${API_VERSION}/`;

const getToken = () => {
  if (typeof window === "undefined") return null;
  const cookies = document.cookie.split(";");
  console.log(cookies);
  return false;
};

const MakeHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  const access_token = token || getToken();
  if (access_token) {
    headers.Token = access_token;
  }

  return { ...headers };
};

const AxiosInstance = (token) => {
  const axios_config = {};
  axios_config.baseURL = BASE_URL;
  axios_config.timeout = 1000 * 35;
  axios_config.responseType = "json";
  axios_config.headers = MakeHeaders(token);
  axios_config.httpAgent = new http.Agent({ keepAlive: true });
  axios_config.httpsAgent = new https.Agent({ keepAlive: true });
  axios_config.transformResponse = [
    response => (typeof response === "string" ? JSON.parse(response) : response)
  ];

  return axios.create(axios_config);
};

const errorResponse = (err) => {
  let error = err;
  if (err.response && err.response.data) {
    // eslint-disable-next-line prefer-destructuring
    error = err.response.data.error;
  }
  throw error;
};

const AxiosDispatchResponse = (method, resource, params) => {
  const { body, qs } = params || {};

  let parameters = {};
  if (body) {
    parameters = body;
  } else if (qs) {
    parameters.params = qs;
  }

  return method(resource, parameters).then(response => response.data).catch(errorResponse);
};

class ApiRequest {
  constructor(resource = null, token = null) {
    this.axios_instance = AxiosInstance(token);
    this.resource = resource;
  }

  get = params => AxiosDispatchResponse(this.axios_instance.get, this.resource, params);

  put = params => AxiosDispatchResponse(this.axios_instance.put, this.resource, params);
}

module.exports = ApiRequest;
