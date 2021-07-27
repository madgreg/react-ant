const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { join } = require("path");
const { HotModuleReplacementPlugin } = require("webpack");

const mode = process.env.ENV || "development";

module.exports = {
    mode,
    entry: join(__dirname, "src/index.jsx"),
    output: {
        path: join(__dirname, "build"),
        filename: "bundled.js",
    },
    resolve: { 
        extensions: [".js", ".json", ".jsx", ".ts", ".tsx", ".node"],
        modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules")],
    },
    devServer: {
        port: 1000,
        hot: true,
        // open: true,
        historyApiFallback: true,
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf)$/,
                use: "url-loader?limit=25000",
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "@svgr/webpack",
                    },
                ],
            },
        ],
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            // favicon: false,
            // showErrors: true,
            // cache: true,
            template: join(__dirname, "dist/index.html"),
        }),
    ],
};
