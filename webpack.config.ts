import * as path from 'path'
import * as webpack from 'webpack'
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: webpack.Configuration = {
  target: 'node',
  // mode: 'production',
  entry: './index.js',
  output: {
    // filename 定义打包的文件名称
    // [name] 对应entry配置中的入口文件名称（如上面的main）
    // [hash] 根据文件内容生成的一段随机字符串
    filename: 'index.[hash].js',
    // path 定义整个打包文件夹的路径，文件夹名为 dist
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: "10- webpack 自动生成 index.html" //配置title属性
    // })
  ]
}

export default config;