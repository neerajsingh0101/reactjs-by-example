var path = require('path');
var webpack = require('webpack');



module.exports = {
  entry: [path.resolve(__dirname, './src/client/scripts/client.js')],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /src\/.+.js$/, exclude: /node_modules/, loader: 'babel', include: path.join(__dirname, 'src')},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.woff(\d+)?$/, loader: 'url?prefix=font/&limit=5000&mimetype=application/font-woff'},
      {test: /\.ttf$/, loader: 'file?prefix=font/'},
      {test: /\.eot$/, loader: 'file?prefix=font/'},
      {test: /\.svg$/, loader: 'file?prefix=font/'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
    ]
  }
};
