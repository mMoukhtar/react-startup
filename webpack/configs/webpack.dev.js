import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

// Get access to dirname in case of using this config as ES6 module
// This file is called with babel-node not node is packages scrips
// Accordingly we can use import and other ES6 syntax but we don't have access to import.meta.url
// Becasue this is a normal .js and not .mjs
// const moduleURL = new URL(import.meta.url);
// const dirname = path.dirname(moduleURL.pathname);

export default {
  // Development settings
  mode: 'development',
  entry: {
    client: './src/client/index.js',
  },
  //[name] is resolved to the same name as entry
  // Ex: entry contain  client: './src/client/index.js'
  // Therefor output will get names client
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/',
    library: 'Client',
    libraryTarget: 'var',
  },
  // The resolve part will resolve in conflicts
  resolve: {
    // If there is extensions conflicts it will get solved from
    // left to right first look for .js then .mjs then .jsx etc..
    extensions: ['.js', '.mjs', '.jsx'],
  },
  // Dev Tools
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../../dist'),
    compress: true,
    port: 3000,
    open: 'Google Chrome',
    watchContentBase: true,
    hot: true,
    stats: {
      colors: true,
    },
  },
  stats: 'verbose',
  // Loaders
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
            plugins: [['@babel/plugin-proposal-class-properties']],
          },
        },
      },
      {
        test: /\.s?css$/,
        // Loaders working from right to left
        // sass loader first then css loader then minicss
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  // Plugins
  plugins: [
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: './public/index.html',
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
  ],
};
