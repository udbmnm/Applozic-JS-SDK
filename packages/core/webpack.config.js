const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const clientConfig = {
  target: "web", // <=== can be omitted as default is 'web'
  mode: "production",
  entry: "./src/web.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
    }),
  ],
  output: {
    library: {
      name: "@applozic/ui-components",
      type: "umd",
      umdNamedDefine: true,
    },
    filename: "bundle.web.js",
    path: path.resolve(__dirname, "dist_web"),
  },
};

module.exports = [clientConfig];
