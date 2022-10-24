const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [new HtmlWebpackPlugin()],
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true,
        hot: true,

        compress: true,
        port: 9000,
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        library: "examples"
    },
};