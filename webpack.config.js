const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    store: "./src/store.js",
    checkout: "./src/checkout.js",
    favorites: "./src/favorites.js",
    main: "./src/main.js"
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
        test: /\.css$/, // Zmieniamy regułę na pliki .css
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
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
      template: "./src/main.html",
      inject: true,
      chunks: ["main"],
      filename: "main.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/favorites.html",
      inject: true,
      chunks: ["favorites"],
      filename: "favorites.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/store.html",
      inject: true,
      chunks: ["store"],
      filename: "store.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/checkout.html",
      inject: true,
      chunks: ["checkout"],
      filename: "checkout.html",
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
