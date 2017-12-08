const webpack = require('webpack');
const koaMiddleware = require('koa-webpack-middleware');
const config = require('../webpack.config');
const devMiddleware = koaMiddleware.devMiddleware;
const hotMiddleware = koaMiddleware.hotMiddleware;

class WebpackLoader {
  constructor() {
    this.compiler = webpack(config);
  }

  getDev() {
    const webpackOptions = { publicPath: `${config.output.publicPath}dist/`, stats: { colors: true }, index: "/" };
    return devMiddleware(this.compiler, webpackOptions);
  }

  getHot() {
    return hotMiddleware(this.compiler);
  }
}

module.exports = WebpackLoader;
