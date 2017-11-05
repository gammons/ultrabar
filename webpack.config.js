var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './src/index.js']
  },
  output: {
    path: path.resolve(__dirname,'public/built'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/built/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      ultrabar: "/home/grant/.config/ultrabar",
    },
  },
  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/built/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  target: "electron-main",
}
