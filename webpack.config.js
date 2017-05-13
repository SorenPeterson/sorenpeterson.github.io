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
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loaders: 'style-loader!css-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/html/index.html'
    })]
};

module.exports = webpackConfig;
