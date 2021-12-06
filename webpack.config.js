const HtmlWebpackPlugin = require("html-webpack-plugin");
const path=require('path')
const webpack=require('webpack')
//HMR热更新：在不刷新页面的情况下，把页面中的改动同步进来
module.exports={
    mode:'development',
    resolve:{
    extensions:['.js','.jsx']//引入的时候不加后缀名，webpack直接自动遍历这个数组，匹配文件
    },
    entry:path.resolve(__dirname,'src/index.jsx'),
    module:{
        rules:[
            {
               test:/\.jsx?/,//匹配js jsx
               exclude:/node_modules/,
               use:{
                   loader:"babel-loader",//把某个文件夹排除在外
                   options:{
                       babelrc:false,
                       presets:[
                        require.resolve('@babel/preset-react'),//转义jsx的规则
                        [require.resolve('@babel/preset-env',{modules:false})]//转义es6 modules:false是否将import 转义
                       ],
                       cacheDirectory:true

                   }

               }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'src/index.html'),//需要被打包的绝对文件路径
            filename:'index.html'//打包之后的文件名
        }),
        new webpack.HotModuleReplacementPlugin()//热更新的实例
    ],
    devServer:{
        hot:true //把热更新设置为true
    }
}