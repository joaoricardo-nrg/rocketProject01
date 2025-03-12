const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
    target: "web",
    mode: "development",

    entry: path.resolve(__dirname, "main.js"),
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },

    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        port: 3000,
        open: true,
        liveReload: true,
    },

    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "index.html"),
        //favicon: path.resolve()

    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, "assets"),
                to: path.resolve(__dirname, "dist", "assets")
            },    
        ],
    })
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ],
    },
}