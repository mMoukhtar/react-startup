import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../configs/webpack.dev';

process.env.NODE_ENV = 'development';
console.clear();
console.log(chalk.blue('---------------------------------------------------------------'));
console.log(`📦 ${chalk.white.bgBlue('[ WEBPACK ]:: Generating minified bundle for development....')}`);
console.log(chalk.blue('---------------------------------------------------------------'));

const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer);
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(3000, '127.0.0.1', () => {
  console.log(chalk.blue('---------------------------------------------------------------'));
  console.log(`🖥️  ${chalk.white.bgBlue('[ WEBPACK - DEV SERVER ]:: Running on http://localhost:3000')}`);
  console.log(chalk.blue('---------------------------------------------------------------'));
});
