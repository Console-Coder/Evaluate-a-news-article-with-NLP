const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    mode: "production",
    entry: "./src/client/js/functions.js",
    output: {
        path: path.join(__dirname,"dist"),
        filename: "js/finalBundle.js"
    },
    devServer: {
		contentBase: path.join(__dirname, 'dist'),
		openPage: 'views',
		open: true
	},
    module: {
        rules: [
            {
            test: /\.scss$/,
            use: ['style-loader','css-loader','sass-loader'],
            exclude: /node_modules/
            },
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			}
    ]
    },
    plugins: [new HtmlWebpackPlugin({
            template: 'src/client/views/index.html',
            filename: 'views/index.html'
        }),
        new CleanWebpackPlugin({protectWebpackAssets: false }),
		new WorkboxPlugin.GenerateSW({
       clientsClaim: true,
       skipWaiting: true,
	   swDest: path.join(__dirname, 'dist/service-worker.js')
     })
    ]
};