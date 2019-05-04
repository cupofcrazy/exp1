const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development', //Mode
    devtool: 'inline-source-map', // Devtool
    entry: ['./src/index.js'],
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
            
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [ { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' }}, 'css-loader' ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/images/'
                    },
                  },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            }           // {
            //     test: /\.(WOFF(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //             outputPath: 'assets/fonts'
            //         }
            //     }]
            // }
        ]
    },
    /** PLUGINS */
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin(['dist'])
    ]
}