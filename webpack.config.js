const webpack = require("webpack");
const path = require("path");
const svgToMiniDataURI = require("mini-svg-data-uri");

module.exports = {
    entry: path.resolve(__dirname, "./src/index.jsx"),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"],
            },
            {
                test: /\.css$/i,
                // exclude: /node_modules/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                   
                ],
            },            
            {
                test: /\.less$/,
                use: ["style-loader", {loader: 'css-loader', options: {sourceMap: 1}}, "postcss-loader", "less-loader"]
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "url-loader",
                },
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            generator: (content) => svgToMiniDataURI(content.toString()),
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|ttf)$/,
                use: {
                    loader: "url-loader",
                },
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
    },
    plugins: [
        // добавим плагин для hmr
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        compress: true,
        port: 3000,
        // сообщим dev-серверу, что в проекте используется hmr
        hot: true,
    },
};
