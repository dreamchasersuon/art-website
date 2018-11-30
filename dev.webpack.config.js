const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  entry: {
    dev: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist/dev'),
    publicPath: 'http://localhost:8080/dist/dev/'
  },
  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dev'),
    compress: true,
    port: 9000
  },

  plugins: [
    new CleanWebpackPlugin(['./dist/dev']),
    new HtmlWebpackPlugin({
      template: 'src/template-html/home.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }
  ]
}
};
