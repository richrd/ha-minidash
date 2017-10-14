// Builtins
const path = require('path');

// Externals
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// A single place for paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
  CSS: path.resolve(__dirname, 'src/css'),
};


// Webpack configuration
module.exports = {

  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(paths.JS, 'index.jsx'),
      path.join(paths.CSS, 'index.sass'),
    ],
  },


  output: {
    path: paths.DIST,
    filename: '[name].[hash].js',
  },


  // Enable importing files without specifying their's extenstion
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.scss'],
  },

  // Use the html plugin to inject necessary stuff into index.html
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
  ],

  // Loaders configuration
  // Use "babel-loader" for .js and .jsx files
  // Use css loaders for sass & scss
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },


  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
  },

};
