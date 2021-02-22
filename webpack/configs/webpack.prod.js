import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
//import WorkboxPlugin from 'workbox-webpack-plugin';

// Get access to dirname in case of using this config as ES6 module
// This file is called with babel-node not node is packages scrips
// Accordingly we can use import and other ES6 syntax but we don't have access to import.meta.url
// Becasue this is a normal .js and not .mjs
// const moduleURL = new URL(import.meta.url);
// const dirname = path.dirname(moduleURL.pathname);

export default {
  // Production settings
  mode: 'production',
  entry: {
    client: './src/client/index.js',
  },
  output: {
    libraryTarget: 'var',
    library: 'Client',
    //[name] is resolved to the same name as entry
    // Ex: entry contain  client: './src/client/index.js'
    // Therefor output will get names client
    filename: '[name].js',
    path: path.resolve(__dirname, '../../dist'),
  },
  // The resolve part will resolve in conflicts
  resolve: {
    // If there is extensions conflicts it will get solved from
    // left to right first look for .js then .mjs then .jsx etc..
    extensions: ['.js', '.mjs', '.jsx'],
  },
  // Dev Tools
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserPlugin({}), new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /.m?js$/,
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
          // This should match .babelrc
          // The point of having it here in case .babelrc is missing
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import'],
          },
        },
      },
      {
        test: /\.s?css$/,
        // Loaders working from right to left
        // sass loader first then css loader then minicss
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    //new WorkboxPlugin.GenerateSW(),
  ],
};
