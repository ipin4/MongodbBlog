const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'client'),
  entry: './index.jsx',
  output: {
    path: path.resolve('public'),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  plugins: [
    /*new webpack.optimize.UglifyJsPlugin(),*/
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ ,
        query: {
          presets:[ 'es2015', 'react', 'stage-2' ]
        },
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/ ,
        query: {
          presets:[ 'es2015', 'react', 'stage-2' ],
          plugins: ['transform-decorators-legacy']
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: [
            {
              loader: 'css-loader',
              query: {
                localIdentName: '[local]',
                modules: true
              }
            }
          ]
        })
      },
    ]
  },
  watch: true
}
