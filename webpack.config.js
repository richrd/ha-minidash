// Builtins
const fs = require('fs');
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


// Helper for getting the version from package.json
function getPackageVersion() {
  const pkgJson = fs.readFileSync('./package.json');
  const { version } = JSON.parse(pkgJson);
  return JSON.stringify(version);
}


exports.fonts = {
  test: /\.(eot|woff|woff2|ttf|svg)(\?[\s\S]+)?$/,
  loader: 'url-loader?limit=1000&name=fonts/[name].[ext]',
  exclude: /node_modules/,
  include: [path.resolve(__dirname, '/node_modules/mdi/fonts')],
};

// Webpack configuration
module.exports = {

  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.join(paths.JS, 'index.jsx'),
      path.join(paths.CSS, 'index.sass'),
      'mdi/css/materialdesignicons.css',
      'weather-underground-icons/dist/wu-icons-style.css',
    ],
  },


  output: {
    path: paths.DIST,
    filename: '[name].[hash].js',
    publicPath: '/',
  },


  // Enable importing files without specifying their's extenstion
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.scss'],
  },


  // Use the html plugin to inject necessary stuff into index.html
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      __PKG_VERSION__: getPackageVersion(),
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
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },


  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    contentBase: path.resolve(__dirname, 'public/'),
    publicPath: '/',
  },

};
