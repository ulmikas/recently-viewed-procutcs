var webpack = require('webpack')

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:5959',
        'webpack/hot/only-dev-server',
        './index.js'
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/js/dist',
        publicPath: '/js/dist/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './',
        port: 5959,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

}
