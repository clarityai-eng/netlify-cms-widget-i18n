const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin');

const developmentConfig = {
  mode: 'production',
  entry: './dev/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	},  
  plugins: [
    new HtmlWebpackPlugin(),
    // new BrotliPlugin({
    //   asset: '[path].br[query]',
    //   test: /\.(js|css|html|svg)$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // })
  ],
  devtool: '',
}

const productionConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      // {
      //   test: require.resolve('hot-formula-parser/dist/formula-parser.js'),
      //   use: 'ignore-loader'
      // },
      // {
      //   test: require.resolve('handsontable/es/3rdparty/walkontable/src/index.js'),
      //   use: 'ignore-loader'
      // }               
    ],
  },
  devtool: 'source-map',
}

module.exports = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig