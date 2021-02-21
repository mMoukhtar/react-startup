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
    port: 3000,
    open: 'Google Chrome',
    contentBase: path.join(__dirname, '../../dist'),
    hot: true,
    compress: true,
    watchContentBase: true,
    stats: {
      colors: true,
    },
    //When using this we are telling webpack dev server to return any 404 requests to output.publicPath
    // settings of webpack.config in this case it will redirect any 404 requests to home page
    // this is important to disable webpack to act as server and fall back to public path and allow
    // react router to take care of the routing
    historyApiFallback: true,
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
  ],
};
