import webpack from 'webpack';
import {pathConfig} from './pathConfig';
let webpackConfig = {
  entry: [
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/dev-server',
    './src/app'
  ],
  devtool: 'source-map',
  debug: true,
  output: {
    path: pathConfig.dist.js,
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  paths: {
    src: pathConfig.src.root,
    dist: pathConfig.dist.root
  },
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel', 'eslint'], include: pathConfig.src.root}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

export default webpackConfig;
