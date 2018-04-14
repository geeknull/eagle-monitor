const webpack = require('webpack');
const path = require('path');

let isDev = process.env.NODE_ENV === 'develop'; // 是否是开发环境
const host = 'localhost';
const port = 8601;

module.exports = {
  entry: {
    vendor: ['babel-polyfill', 'react', 'react-dom'],
    main: './react-app.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: isDev ? `http://${host}:${port}/` : '/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                option: {
                  'targets': {
                    'browsers': ['chrome >= 44','firefox >= 51', 'safari >= 9']
                  }
                }
              }], 'react'
            ],
            plugins: ['transform-runtime']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',
  context: __dirname,
  devServer: {
    hot: true,
    port: port,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':
        isDev ? JSON.stringify('develop') : JSON.stringify('production')
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: false,
    //   mangle: false,
    //   sourceMap: true,
    //   output: {
    //     comments: false
    //   }
    // }),

    // new webpack.SourceMapDevToolPlugin({
      // exclude: 'vendor',
      // excludeChunks: ["vendors"]
    // }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].bundle.js',
      minChunks: Infinity
    }),
  ]
};
