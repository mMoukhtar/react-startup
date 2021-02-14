import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../configs/webpack.dev.js';

process.env.NODE_ENV = 'development';
console.log(chalk.blue('Generating minified bundle for development...'));

const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer);
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(3000, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:3000');
});
