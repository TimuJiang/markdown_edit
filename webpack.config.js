var webpack = require('webpack');
var path = require("path")
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //依赖的第三方扩展
    externals: {
        artTemplate: 'window.template',
        jquery: 'window.$'
    },
    //插件项
    plugins: [
        new ExtractTextPlugin("[name].css"),
         new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            filename:path.resolve(__dirname,'./dist/template/template.html'),    //生成的html存放路径，相对于 path
            template:'./src/template/index.template.html',    //html模板路径
            inject:false,    //允许插件修改哪些内容，包括head与body
            hash:true,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        })
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
            //{test: /\.css$/, loader: "style!css"},
            //{test: /\.(jpg|png)$/, loader: "url?limit=8192"},
            {test: /\.scss$/, loader: "style!css!sass"}
        ]
    }
};