const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const webpack = require('webpack');
const fs = require('fs');

const clientConfig = {
  target: 'web', // <=== can be omitted as default is 'web'
  mode: 'production',
  entry: './src/web.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development'
    }),
    new webpack.BannerPlugin({
      banner: () => {
        const pathToPackageJson = path.join(__dirname, './package.json');
        const packageContents = fs.readFileSync(pathToPackageJson, 'utf8');
        const packageJson = JSON.parse(packageContents);
        return `\nApplozic Web SDK v${packageJson.version}\n`;
      }
    })
  ],
  output: {
    library: {
      name: '@applozic/ui-components',
      type: 'umd',
      umdNamedDefine: true
    },
    filename: 'sdk.js',
    path: path.resolve(__dirname, 'dist_web')
  }
};

module.exports = [clientConfig];
