var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var commonConfig = {
  postcss: [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ],
  sassLoader: {},
  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
  },
  module: {
    loaders: [
      // TypeScript
      {test: /\.ts$/, loaders: ['ts-loader', 'angular2-template-loader']},
      {test: /\.html$/, loader: 'raw-loader'},
      {test: /\.css$/, loader: 'raw-loader'},
      {test: /\.json$/, loader: 'raw-loader'},
      {
        test: /\.scss$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract('raw', 'css?sourceMap!postcss!sass')
      },
      // all css required in src/app files will be merged in js files
      {test: /\.scss$/, exclude: root('src', 'style'), loader: 'raw!postcss!sass'}
    ],
    preLoaders: [
      // needed to lower the filesize of angular due to inline source-maps
      {test: /\.js$/, loader: 'source-map-loader'}
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new ExtractTextPlugin('css/[name].[hash].css', {disable: false})
  ]

};


var clientConfig = {
  target: 'web',
  entry: './src/client',
  output: {
    path: root('dist/client')
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};


var serverConfig = {
  target: 'node',
  entry: './src/server', // use the entry file of the node server if everything is ts rather than es5
  output: {
    path: root('dist/server'),
    libraryTarget: 'commonjs2'
  },
  externals: checkNodeImport,
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};


// Default config
var defaultConfig = {
  context: __dirname,
  resolve: {
    root: root('/src')
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'index.js'
  }
}


var webpackMerge = require('webpack-merge');
module.exports = [
  // Client
  webpackMerge({}, defaultConfig, commonConfig, clientConfig),

  // Server
  webpackMerge({}, defaultConfig, commonConfig, serverConfig)
]

// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request);
    return;
  }
  cb();
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
