var webpack = require('webpack');
var path = require("path")
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    //依赖的第三方扩展
    externals: {
        artTemplate: 'window.template',
        jquery: 'window.$'
    },
    //插件项
    plugins: [
        new ExtractTextPlugin("[name].css"),
    ],
    //页面入口文件配置
    entry: {
        index : './src/js/index.js'
    },
    //入口文件输出配置
    output: {
        path: __dirname+'/dist/js/',
        filename: 'nbj.activitiy.js'
    },
    // 新添加的module属性
    module: {
        loaders: [
            //{test: /\.js$/, loader: "babel"},
            {test: /\.css$/, loader: "style!css"},
            //{test: /\.(jpg|png)$/, loader: "url?limit=8192"},
            //{test: /\.scss$/, loader: "style!css!sass"},
            {test: /\.html$/, loader: "string"}
        ]
    }
};