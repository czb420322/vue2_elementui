let path  = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    devServer: {
        contentBase: './dist',
        port: 8080,
        open: true
    },
    entry: './src/main.js',
    // entry:{
    //     main:"./src/main.js",
    //     test:"./src/test.js"
    // },
    output:{
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash:8].js"
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                use:["vue-loader"]
              },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除的目录
                // 使用babel-loader将ES6代码转为ES5，做浏览器兼容
                // 同时需要建立.babelrc文件，调用@babel/preset-env插件将E6转为E5S
                loader: "babel-loader"
          },
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name(resourcePath, resourceQuery) {
                    // `resourcePath` - `/absolute/path/to/file.js`
                    // `resourceQuery` - `?foo=bar`
                    if (process.env.NODE_ENV === 'development') {
                      return '[path][name].[ext]';
                    }
                    return '[contenthash].[ext]';
                  },
                },
              },
            ],
          },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "webpack",
            template: "public/index.html",
            chunks: ['main']
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        // 当安装vue时，默认使用的是runtime-only版本，此版本只含有vue运行的代码，不包含编译template的代码
        // 需要重新更换含有runtime-compiler的版本，因为runtime-complier含有complier代码可以用于编译template
        // alias（别名）: 用别名代替前面的路径，不是省略，而是用别名代替前面的长路径
        // 如下，当main.js中import Vue from "vue"时，因为vue是别名，所以实际为import Vue from "vue/dist/vue.esm.js"
        // 别名好处是webpack直接会去别名对应的目录去查找模块，减少了webpack自己去按目录查找模块的时间
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        }
      }
  };
