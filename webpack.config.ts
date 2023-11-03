
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const { HASH = 'false' } = process.env;

const config = {
  target: 'node',
  mode: 'production',
  entry: './index.js',
  node: {
    global: true,
    __filename: true,
    __dirname: true
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: true,
          },
          output: {
            comments: true,
          }
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
        
      }
    ]
  },
 
  output: {
    publicPath: './',
    path: path.join(__dirname, 'dist'),
    // filename: 'index.[contenthash].js',
    filename: HASH === 'false' ? 'index.cjs' : '[name].[contenthash:8].cjs',
    chunkFilename: '[name].[contenthash:8].async.cjs',
    pathinfo: false,
    assetModuleFilename: 'static/[name].[hash:8][ext]',
    hashFunction: 'xxhash64',
    clean: true
  },
  watchOptions: {
    ignored: '**/node_modules'
  },
  resolve: {
    symlinks: true,
    alias: {
      '@': path.join(__dirname, '/src')
    },
    extensions: [
      '.ts', '.js',
      '.mjs', '.cjs',
      '.json', '.wasm'
    ],
    modules: ['node_modules']
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};

module.exports = config;
