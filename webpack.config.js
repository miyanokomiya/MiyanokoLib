// $ webpack

var webpack = require("webpack");

module.exports = {
	entry: './src/core.js',
	output: {
		path: './dest/',
		filename: 'MiyanokoLib.js',
		library: 'MiyanokoLib',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			// { test: /\.html$/, loader: 'html' }
		]
	},
	//devtool: 'source-map',
	resolve : {
		root : "./src/",
		alias : {
		}
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false }
		}),
	]
};
