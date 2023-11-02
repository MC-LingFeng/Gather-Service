import * as path from 'path'
import * as webpack from 'webpack'
import { CleanWebpackPlugin } from "clean-webpack-plugin"


import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { HASH = 'false' } = process.env

const config: webpack.Configuration = {
  target: 'node',
  mode: 'production',
  entry: './index.js',
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    publicPath: './',
    path: path.join(__dirname, 'dist'),
    // filename: 'index.[contenthash].js',
    filename: HASH === 'false'? 'index.cjs' :'[name].[contenthash:8].cjs',
    chunkFilename: '[name].[contenthash:8].async.cjs',
    pathinfo: false,
    assetModuleFilename: 'static/[name].[hash:8][ext]',
    hashFunction: 'xxhash64',
    clean: true,
  },
  watchOptions: {
    ignored: '**/node_modules',
  },
  resolve: {
    symlinks: true,
    alias: {
      "@": __dirname + '/src'
    },
    extensions: [
      '.ts',  '.js', 
      '.mjs',  '.cjs',
      '.json', '.wasm'
    ],
    modules: [ 'node_modules' ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
}

export default config;