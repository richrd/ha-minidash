// Builtins
const path = require('path');

// Externals
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
  //entry: path.join(paths.JS, 'app.js'),

  entry: {
    app: [
      path.join(paths.JS, 'app.js'),
      path.join(paths.CSS, 'index.sass'),
    ],
  },


  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
  },


  // Use the html plugin to inject necessary stuff into index.html
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
      inject: 'body',
      filename: 'index.html',
    }),
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
      }
    ],
  },


  // Enable importing files without specifying their's extenstion
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.scss'],
  },
};
