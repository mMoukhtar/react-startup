import webpack from 'webpack';
import webpackConfig from '../../webpack.prod.js';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';
console.log(chalk.blue('Generating minified bundle for production...'));

webpack(webpackConfig).run((error, status) => {
    if (error) {
        console.log(chalk.red(error));
        return 1;
    } else {
        const jsonStatus = status.toJson();

        if (status.hasErrors()) {
            console.log(chalk.yellow('Webpack generated the following errors'));
            return jsonStatus.errors.map((error) => {
                console.log(chalk.red(error.message));
            });
        }

        if (status.hasWarnings()) {
            console.log(chalk.yellow('Webpack generated the following warnings'));
            return jsonStatus.warnings.map((warning) => {
                console.log(chalk.yellow(warning.message));
            });
        }

        console.log(chalk.green(`Webpack status: ${status}`));

        return 0;
    }
});
