const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
	// mode: "development",
	entry: "./src/index.js",
	// output: {
	// 	filename: "main.[hash].js",
	// 	path: path.resolve(__dirname, "dist"),
	// 	clean: true,
	// },
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/template.html",
		}),
	],
};
