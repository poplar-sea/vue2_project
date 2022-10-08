const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let config = {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue', '.json'], // import引用文件省略后缀
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        static: { // 配置静态资源存放位置
            directory: __dirname // 根目录下文件
        },
        open: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader', // 注：style-loader、MiniCssExtractPlugin.loader不能同时使用
                    "css-loader"
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         sourceMap: true,
                    //         postcssOptions: {
                    //             path: 'postcss.config.js'
                    //         }
                    //     }
                    // }
                ]
            },
            {
                test: /\.(gif|png|svg|jpe?g)(\?.*)?$/,
                loader: "url-loader", // 建议使用url-loader，不用file-loader，减少http请求次数
                options: {
                    limit: 1024
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10240
                }
            }
        ]
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css' // 散落样式提取为main.css文件，通过link标签加入html文件
        }),
        new VueLoaderPlugin() //  手动创建项目，需在webpack中使用vue-loader自带插件
    ]
}
module.exports = config;


