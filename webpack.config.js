var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/html/index.html'
    })]
};

module.exports = webpackConfig;
