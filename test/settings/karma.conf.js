var webpackConfig = require('../../webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['mocha', 'chai-things', 'chai', 'sinon'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'client/index.js',
      'test/client/**/*.js'
    ],
    preprocessors: {
      'client/index.js': ['webpack', 'sourcemap'],
      'test/client/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    babelPreprocessor: {
      options: {
        optional: ['runtime'], // per http://babeljs.io/docs/usage/options/
        sourceMap: 'inline'
      }
    },
    webpackMiddleware: {
      quiet: true,
      stats: {
        colors: true
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
