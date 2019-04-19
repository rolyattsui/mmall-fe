/*
 * @Author: Taylor 
 * @Date: 2019-04-17 11:41:24 
 * @Last Modified by: Taylor
 * @Last Modified time: 2019-04-19 18:02:10
 */

// module.exports = {
//     entry: './src/page/index/index.js',
//     output: {
//         path: './dist',
//         filename: 'app.js'
//     }
// }

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

// 配置环境变量
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

function getHTMLConfigs(name){
    return {
            template :  './src/view/' + name + '.html',
            filename :  'view/' + name + '.html',
            inject   :  true,
            hash     :  true,
            chunks   :  ['common', name]
        }
}

var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
    },
    output: {
        path: './dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders : [
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract('style-loader','css-loader') 
            },
            { 
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
                loader: 'url-loader' 
            }
        ]
    },
    plugins: [
        // 独立通用模块到base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 单独打包CSS
        new ExtractTextPlugin('css/[name].css'),
        // Html模板的处理
        new HTMLWebpackPlugin(getHTMLConfigs('index')),
        new HTMLWebpackPlugin(getHTMLConfigs('login')),
    ]
};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;