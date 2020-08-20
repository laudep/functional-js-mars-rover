const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require("path");

module.exports = {
    mode: "development",
    entry: [path.resolve('./src/public/css/index.scss'), path.resolve('./src/public/js/index.js')],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './dist/public')
    },
    devServer: {
        contentBase: "/dist/public",
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: [/.css$|.scss$/],
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'bundle.css',
                        },
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer Dart Sass
                            implementation: require('sass'),

                            // See https://github.com/webpack-contrib/sass-loader/issues/804
                            webpackImporter: false,
                            sassOptions: {
                                includePaths: ['./node_modules'],
                            },
                        },
                    }
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/public/index.html",
            inject: true,
        }),
        new CopyPlugin({
            patterns: [{
                from: './src/server',
                to: path.resolve(__dirname, './dist/server')
            }],
        }),
    ],
};
