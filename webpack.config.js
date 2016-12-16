const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	context: __dirname + '/client',
	entry: './src/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				exclude: /node_modules/,
				test: /\.(js|jsx)$/,
				loader: 'babel'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css!sass')
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('css')
			}

		]
	},
	devServer: {
		historyApiFallback: true,
		contentBase: './client'
	},
	plugins: [
		new webpack.DefinePlugin({ 'process.env':{ 'NODE_ENV': JSON.stringify('production') } }),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
		  compress: { warnings: false },
		  output: {comments: false },
		  mangle: false,
		  sourcemap: false,
		  minimize: true,
		  mangle: { except: ['$super', '$', 'exports', 'require', '$q', '$ocLazyLoad'] }
		}),
		new ExtractTextPlugin('app.css', {
			allChunks: true
		})
	]
};

module.exports = config;
