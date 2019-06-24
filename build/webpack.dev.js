const path = require('path');
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//css单独打包

const baseConf = require("./webpack.base.js")();
const customDevServerConfig = require("./devServer.js").default;
const ROOT_PATH = path.resolve(__dirname, '../');

const merged = function(env) {
    return webpackMerge(baseConf, {
        mode: 'development',
        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",
        devServer: Object.assign({
            hot: true, // 开启服务器的模块热替换
            historyApiFallback: true,
            disableHostCheck: true,
            quiet: true,
            stats: {
                colors: true,
                "errors-only": false,
                cached: true
            },
            contentBase: baseConf.output.path

        }, customDevServerConfig),
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(ROOT_PATH, 'public/index.html'),
                inject: "body",
                showErrors: true,
                hash: true
            }),
            new webpack.HotModuleReplacementPlugin() // 开启全局的模块热替换(HMR)
        ]

    });
};

module.exports = merged;