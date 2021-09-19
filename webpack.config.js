const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const setCSSLoaders = (mode) => {
  if (mode === "development") {
    return ["style-loader", "css-loader", "sass-loader"];
  } else {
    return [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"];
  }
};

module.exports = (env, options) => {
  const mode = options.mode;
  const modules = {
    entry: "./src/index.js",
    output: {
      filename: "main.[contenthash].js",
      path: path.resolve(__dirname, "dist"),
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          use: "html-loader",
        },
        {
          test: /\.s?css$/i, //do not forget to install node-sass!!!!
          use: setCSSLoaders(mode),
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/template.html",
        path: __dirname + "/dist",
      }),
    ],
    resolve: {
      extensions: ["*", ".js"],
    },
    devServer: {
      static: "./dist",
    },
  };
  return modules;
};
