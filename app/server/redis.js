const session = require("express-session");
const RedisStore = require("connect-redis")(session);


function retry_strategy(options) {
  if (options.error && options.error.code === "ECONNREFUSED") {
    return new Error("The server refused the connection");
  }

  if (options.total_retry_time > 1000 * 60 * 60) {
    return new Error("Retry time exhausted");
  }

  if (options.attempt > 10) {
    return undefined;
  }

  return Math.min(options.attempt * 100, 3000);
}

const redis = require("redis").createClient({
  host: process.env.REDIS_SERVER,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  db: 0,
  prefix: "web:app:",
  retry_strategy
});

const options = {
  store: new RedisStore({ client: redis }),
  secret: process.env.REDIS_SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false
};

redis.on("error", (error) => {
  // eslint-disable-next-line no-console
  console.error(`Error ${error}`);
});

redis.on("ready", () => {
  // eslint-disable-next-line no-console
  console.info("The redis connection is ready");
});


module.exports = () => session(options);
