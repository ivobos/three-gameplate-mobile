var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        splash : './src/main/js/client/splash.js'
    },
    output: {
        path: 'www',
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel', query: {presets: ['es2015']}, exclude: /(node_modules)/ },
            { test: /\.jsx$/, loader: 'babel', query: {presets: ['es2015', 'react']}, exclude: /(node_modules)/ },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file?name=material-design-icons/iconfont/[name].[ext]' },
            { test: /\.scss$/, loaders: ["style", "css", "sass"] },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=/img/[name].[ext]"}
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Gameplate',
        chunks: ['splash']
    })]
};
