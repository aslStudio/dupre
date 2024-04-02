const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  name: 'client',
  entry: {
    client: path.resolve(__dirname, '../src/index.tsx'),
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: '../typescript/tsconfig.client.json',
        },
      },
      {
        test: /\/critical.scss$/i,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
        ],
      },
      {
        test: /\/main.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.mov$/,
        loader: "file-loader",
        options: {
          name: '/videos/[name].[ext]'
        }
      }
    ],
  },
  plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[name].css"
      }),
      new CleanWebpackPlugin(),
      new WebpackManifestPlugin(),
  ],
}