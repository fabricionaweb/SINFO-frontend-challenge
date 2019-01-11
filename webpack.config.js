const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',

  context: path.resolve(__dirname, 'src'),
  entry: ['./main.js', './style.scss'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },

  devtool: isProd ? false : 'source-map',
  stats: {
    children: false,
  },

  devServer: {
    stats: 'errors-only',
    disableHostCheck: true,
    watchContentBase: true,
  },

  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: 'html-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
