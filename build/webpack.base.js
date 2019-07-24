const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const Config = {
    entry: {
        main: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: ['file-loader']
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src','title'],
                        //minimize: true
                    }
                }
            },
            {
                test: /\.(jpg|png|gif|webp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        limit: 1024
                    }
                },{
                    loader: 'image-webpack-loader',
                    options: {
                      mozjpeg: {
                        progressive: true,
                        quality: 100
                      },
                      pngquant: {
                        quality: 90,
                        speed: 4
                      },
                      gifsicle: {
                        interlaced: false,
                        optimizationLevel:2
                      }
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    output: {
        
    }
    
}
function setDate(date) {
    Config.entry.main = `./src/${date}/index.js`;
    Config.plugins.push(new HtmlWebpackPlugin({
        template:  `src/${date}/index.html`,
       // minify: true
    }));
    Config.output = {
        path: path.resolve(__dirname,'../dist/'+date),
        filename: 'index.js',
        chunkFilename: '[name].js' // 代码拆分后的文件名
    }
}
setDate('20190712')

module.exports = Config;