var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = {
    entry: './src/index.js',
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },
    plugins: [new HtmlWebpackPlugin()]
};
module.exports = webpackConfig;
