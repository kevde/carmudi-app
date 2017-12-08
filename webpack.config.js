var path = require('path');
var webpack = require('webpack');

var plugins = [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  }),
  // new webpack.DefinePlugin({
  //   'process.env': {
  //     NODE_ENV: '"production"'
  //   }
  // })
];

var entries = [
  'babel-polyfill',
  'jquery',
  'semantic-ui-css/semantic.css',
  'semantic-ui-css/semantic.min.js',
  './client/resources/default.css',
  './client/index.js'
];

if (process.env.NODE_ENV === '') {
  entries.push('webpack-hot-middleware/client');
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  entry: entries,
  output: {
    path: __dirname + '/dist/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.pug'],
    alias: { vue: 'vue/dist/vue.min.js', pug: '@types/pug', $: 'jquery' }
  },
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        plugins: ['transform-decorators-legacy'],
        presets: ['es2015', 'stage-3']
      }
    }, {
      test: /\.pug$/,
      loader: 'pug-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?importLoaders=1'
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      loader: 'url-loader?limit=10000'
    }]
  }
};
