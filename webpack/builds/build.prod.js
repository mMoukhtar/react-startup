import webpack from 'webpack';
import webpackConfig from '../Configs/webpack.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';
console.clear();
console.log(chalk.blue('---------------------------------------------------------------'));
console.log(`📦 ${chalk.white.bgBlue('[ WEBPACK ]:: Generating minified bundle for production....')}`);
console.log(chalk.blue('---------------------------------------------------------------'));

webpack(webpackConfig).run((error, stats) => {
  if (error) {
    console.log(
      `📦 ${chalk.white.bgRed('[ WEBPACK ]:: Fetal error while generating production bundle....')}`
    );
    console.log(`🔴 ${chalk.red('- Error Message::')}`);
    console.log(`🔴 ${chalk.red(error)}`);
    return 1;
  } else {
    const jsonStatus = stats.toJson();

    if (stats.hasErrors()) {
      console.log(`📦 ${chalk.white.bgRed('[ WEBPACK ]:: Errors while generating production bundle....')}`);
      console.log(`❗ ${chalk.red('- Error Message(s)::')}`);
      return jsonStatus.errors.map((error) => {
        console.log(`❗ ${chalk.red(error.message)}`);
      });
    }

    if (stats.hasWarnings()) {
      console.log(
        `📦 ${chalk.black.bgYellow('[ WEBPACK ]:: Warnings while generating production bundle....')}`
      );
      console.log(`⚠️ ${chalk.yellow('- Warning Message(s)::')}`);
      return jsonStatus.warnings.map((warning) => {
        console.log(`⚠️ ${chalk.yellow(warning.message)}`);
      });
    }
    console.log(chalk.blue('---------------------------------------'));
    console.log(`📦 ${chalk.white.bgBlue('[ WEBPACK ]:: Bundling Succeed!')}`);
    console.log(chalk.blue('---------------------------------------'));
    console.log(
      stats.toString({
        colors: true,
        //chunks: true,
      })
    );

    return 0;
  }
});
