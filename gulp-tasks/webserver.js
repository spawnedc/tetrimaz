import gulp from 'gulp';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config';

module.exports = function() {
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    contentBase: webpackConfig.paths.src,
    stats: {
      chunks: false,
      colors: true
    }
  }).listen(8000, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log('Listening at localhost:8000');
  });
};
