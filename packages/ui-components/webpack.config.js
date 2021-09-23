const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  externals: [
    {
      react: 'react'
    }
  ],
  externalsPresets: {
    node: true // in order to ignore built-in modules like path, fs, etc.
  },
  module: {
    // noParse: [ "react" ],
    rules: [
      {
        test: /\.stories\.tsx?$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json'
            }
          }
        ],
        exclude: ['/node_modules/']
      },
      {
        test: /\.css?$/,
        use: 'css-loader'
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: 'inline-source-map',
  plugins: [new ForkTsCheckerWebpackPlugin(), new CleanWebpackPlugin()],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: '@applozic/ui-components',
      type: 'umd'
    }
  }
};
