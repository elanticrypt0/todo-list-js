const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode:'development',
    output:{
        clean:true,
    },
    module:{
        rules:[
            {
                test: /\.html$/,
                loader:'html-loader',
                options:{
                    sources:false,
                }
            },
            {
                test: /\.css$/,
                exclude:/styles.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /styles.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                loader:'file-loader',
            },
        ]
    },
    optimization:{},
    plugins:[
        new HtmlWebpackPlugin({
            title:'Mi webpack',
            filename:'index.html',
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'[name].[fullhash].css$',
            ignoreOrder:false
        }),
        new CopyWebpackPlugin({
            patterns:[
                {from: 'src/assets/', to:'assets/'},
            ],
        }),
    ],
}