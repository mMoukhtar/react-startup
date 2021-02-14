import path from 'path';
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

// Get access to dirname
const moduleURL = new URL(import.meta.url);
const dirname = path.dirname(moduleURL.pathname);

console.log('path', path.resolve(dirname, 'dist'));

export default {
    entry: ['./src/client/index.js'],
    output: {
        filename: 'main.js',
        path: path.resolve(dirname, 'dist'),
        publicPath: '/',
        library: 'Client',
        libraryTarget: 'var',
    },
    // Development settings
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(dirname, 'dist'),
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
                use: 'babel-loader',
                exclude: /node_module/,
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    // Plugins
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            favicon: './public/favicon.ico',
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
