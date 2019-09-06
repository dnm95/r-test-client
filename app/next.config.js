const path = require("path");
const webpack = require("webpack");
const withSASS = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const DotEnv = require("dotenv-webpack");


module.exports = withCSS(withSASS({
  pageExtensions: ["jsx"],
  webpack(config, { dev }) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 100000,
            fallback: "file-loader",
            publicPath: "/_next/static/fonts/",
            outputPath: "static/fonts/",
            name() {
              if (dev) return "[name].[ext]";
              return "[hash].[ext]";
            }
          }
        }
      ]
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      "components": path.resolve(__dirname, "components"),
      "static": path.resolve(__dirname, "static"),
      "helpers": path.resolve(__dirname, "helpers"),
      "HOC": path.resolve(__dirname, "hoc"),
      "actions": path.resolve(__dirname, "actions"),
      "selectors": path.resolve(__dirname, "selectors"),
      "routes": path.resolve(__dirname, "server", "routes"),
      "Api": path.resolve(__dirname, "services")
    };

    config.plugins.push(
      new DotEnv({ systemvars: true }),
      // eslint-disable-next-line no-useless-escape
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
    );
    return config;
  }
}));
