let path = require('path');
let basePath = __dirname;

module.exports = {
    context:  path.join(basePath, 'src'),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    target: "node",
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
    },
    entry: {
        app: [
            '../index.ts'
        ]
    },
    output: {
        path: path.join(basePath, './dist'),
        filename: 'app-backend.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader'
                }],
            },
            {
                test: /\.(ts|tsx)/,
                exclude: /(node_modules|spec)/,
                loaders: ['istanbul-instrumenter-loader'],
                enforce: 'post'
            }
        ],
    },
};