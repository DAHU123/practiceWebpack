'use strict'
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        app: './src/app.js',
        search: './search/search.js',
    },
    output: {
        filename: '[name][chunkhash:8].js',
        path: __dirname + '/dist',
    },
    mode: 'development',
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
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /.(jpg|png|gif|jepg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ],
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                exclude: /node_modules/,
                use: 'file-loader',
            },
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: `[name][contenthash:8].css`
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}