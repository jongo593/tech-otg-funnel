const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
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
			},
			{
				exclude: /node_modules/,
				test: /\.(js)$/,
				loader: StringReplacePlugin.replace({
					replacements: [
						{
							pattern: 'process.env.SERVER_BASE_URL',
							replacement: function (match, p1, offset, string) {
								if(process.env.SERVER_BASE_URL) {
									return `"${process.env.SERVER_BASE_URL}:${process.env.PORT || 3002}"`
								}
								return `"http://0.0.0.0:3002"`
							}
						}
					]})
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
		}),
		new StringReplacePlugin()

	]
};

module.exports = config;
