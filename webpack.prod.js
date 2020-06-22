'use strict'
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const setMPA = () => {
    const entry = {}
}

module.exports = {
    entry: {
        index: './src/index/index.js',
        search: './src/search/index.js',
    },
    output: {
        filename: '[name]_[chunkhash:8].js',
        path: __dirname + '/dist',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                        }
                    }
                ],
            },
            {
                test: /.(jpg|png|gif|jepg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ],
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ],
            },
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `[name]_[contenthash:8].css`
        }),
        new optimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'search/index.html'),
            filename: "index.html",
            chunks: ['search'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: "index.html",
            chunks: ['app'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new CleanWebpackPlugin()

    ],
}