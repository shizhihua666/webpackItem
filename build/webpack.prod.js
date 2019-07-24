const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin');
const Config = require('./webpack.base.js')

const prodConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders:2,
                        }
                    },
                    'less-loader',
                    'postcss-loader'
                ]
            },
        ]
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin()
        ],
        splitChunks: {
            chunks: 'initial',
            minSize: 30000,
            minChunks: 1,
            name: true,
            cacheGroups: {
                swiper: {
                    name: 'swiper',
                    test: /[\\/]node_modules[\\/]swiper[\\/]/,
                    priority: 10
                },
                vendors: {
                    name: 'orthers',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
        })
    ]
}
Config.output.publicPath = '20190712/';   //挂载到服务器路径

module.exports = merge(Config,prodConfig)