const merge = require('webpack-merge');
const Config = require('./webpack.base.js');
const path = require('path')

const devConfig = {
    mode: 'development',
    devServer: {
        contentBase: './dist',
        port: 8088,
        proxy: {
            "/location": {
                target: 'http://api.map.baidu.com/',
                secure: false
            },
            "/newretail": {
                target: 'https://c.holike.com/',
                secure: false
            },
            "/marketing/marketing": {
                target: 'http://modulefile.holike.com/',
                secure: false
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders:3,
                        }
                    },
                    'less-loader',
                    'postcss-loader'
                ]
            },
        ]
    }
}

module.exports = merge(Config,devConfig)