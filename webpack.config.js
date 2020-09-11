const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './client'),
    publicPath: '/dist/',
    host: 'localhost',
    port: 8080,
    proxy: {
      '/find': {
        target: 'http://localhost:3000',
      },
      '/breed': {
        target: 'http://localhost:3000',
      },
      '/add': {
        target: 'http://localhost:3000',
      },
      '/owners': {
        target: 'http://localhost:3000',
      },
    },
  },
};