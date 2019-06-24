const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//css单独打包

const ROOT_PATH = path.resolve(__dirname, '../');
const APP_PATH = path.resolve(ROOT_PATH, 'src');// 应用根路径
const ENTRY_PATH = path.resolve(APP_PATH, 'app.tsx');
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist');
const APP_PWA = path.resolve(APP_PATH, 'pwa');
const VERSION = JSON.stringify(require('../package.json').version); // app version.

module.exports = function() {

    return {
        entry: {
            app: ENTRY_PATH,
            vendor: [
                'react', 'react-dom', 
                'react-router-dom'
            ]
        },
        output: {
            path: OUTPUT_PATH,
            publicPath: "/"
        },
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json", ".scss", ".css"],
            alias: {
            }
        },
        optimization: {
            splitChunks: {
                chunks: "all",
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 8,
                automaticNameDelimiter: "~",
                name: true
            },
            runtimeChunk: {
                name: "manifest"
            }
        },
        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                { 
                    test: /\.tsx?$/,
                    include: APP_PATH,
                    exclude: [
                        path.resolve(ROOT_PATH, "node_modules"),
                    ],
                    loader: [
                        "awesome-typescript-loader",
                        'tslint-loader',
                    ]
                },
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { 
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader" 
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        'css-hot-loader',
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development',
                                // if hmr does not work, this is a forceful method.
                                reloadAll: true,
                            },
                        },
                        'css-loader?url=false',
                        {
                            loader: 'postcss-loader',options: {
                                plugins: () => [require('autoprefixer')]
                            }
                        },
                        'sass-loader',
                    ]
                }, {
                    test: /\.(jpg|png|gif)$/,
                    use: 'file-loader?name=[name].[ext]'
                }, {
                    test: /\.(eot|woff|svg|ttf|woff2|gif|appcache|webp)(\?|$)/,
                    use: 'file-loader?name=[name].[ext]'
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(ROOT_PATH, 'public'),
                    to: path.resolve(OUTPUT_PATH, 'public'),
                    ignore: ['*/index.html']
                }, {
                    from: path.resolve(ROOT_PATH, 'docs'),
                    to: path.resolve(OUTPUT_PATH, 'docs')
                }, {
                    from: path.resolve(ROOT_PATH, '*.md'),
                    to: path.resolve(OUTPUT_PATH, 'docs')
                }, {
                    from: path.resolve(APP_PWA, 'sw.js'),
                    to: path.resolve(OUTPUT_PATH)
                }
            ]),
            new webpack.DefinePlugin({
                APP: {
                    VERSION: VERSION
                }
            })
        ]
    };
}