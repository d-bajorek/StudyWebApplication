const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    kontakt: "./src/kontakt.js",
    koszyk: "./src/koszyk.js",
    wypozyczalnia: "./src/wypozyczalnia.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].bundle.js",
    //filename: "bundle.js",
    clean: true,
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.scss$/, //zamiana css na scss
        use: [
          // "style-loader", <-- już nie potrzebne bo zamieniliśmy za plugin MiniCssExtractPlugin
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
        ], //dopisanie komponentu
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/kontakt.html",
      inject: true,
      chunks: ["kontakt"],
      filename: "kontakt.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/koszyk.html",
      inject: true,
      chunks: ["koszyk"],
      filename: "koszyk.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/**",
          to() {
            return "assets/img/[name][ext]";
          },
        },
      ],
    }),
  ],
};
