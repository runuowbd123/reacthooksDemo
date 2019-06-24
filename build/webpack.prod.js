const path = require('path');
const webpackMerge = require("webpack-merge");
const baseConf = require("./webpack.base.js")();
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');

const htmlMinify = {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
};

// 压缩优化
baseConf.optimization.minimizer = [
    new UglifyJsPlugin({
        parallel: true,
        cache: true,
        uglifyOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
            ecma: 6
        }
    }),
    new OptimizeCSSAssetsPlugin({})
];

baseConf.plugins.push(
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(ROOT_PATH, 'public/index.html'),
        inject: "body",
        showErrors: true,
        hash: true,
        minify: htmlMinify
    })
)

const merged = function(env) {
    return webpackMerge(baseConf, {
        mode: 'production'
    });
};

module.exports = merged;