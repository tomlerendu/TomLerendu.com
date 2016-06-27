var webpack = require('webpack');

module.exports = {
    entry: {
        app: './app/boot'
    },
    output: {
        path: __dirname,
        filename: './resources/bundle.js'
    },
    resolve: {
        extensions: ['', '.js', 'ts']
    },
    module: {
        loaders: [{
            test: /\.ts/, loaders: ['ts-loader'], exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true, mangle: false})
    ]
};