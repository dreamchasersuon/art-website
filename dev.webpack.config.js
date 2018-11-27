const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  mode: 'development',
  entry: {
    dev: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist/dev')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist/dev'),
    hot: true,
    filename: 'index.html'
  },

  plugins: [
    new CleanWebpackPlugin(['./dist/dev/']),
    new HtmlWebpackPlugin({
      title: 'Konstantin Rudenko - contemporary Russian Artist, Moscow',
      template: 'src/template-html/home.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Visualizer()
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
