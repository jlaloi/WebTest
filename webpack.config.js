const prod = process.argv.indexOf('-p') !== -1;

var config = {
  entry: {
    app: [
      './src/main/resources/static/js/main.jsx'
    ],
    login: [
      './src/main/resources/static/js/login.jsx'
    ]
  },
  output: {
    filename: './target/classes/static/[name].bundle.js'
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './target/classes/static/img/',
          publicPath: '/img/'
        }
      },
      {
        test: /\.html$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './target/classes/static/'
        }
      }
    ]
  }
};

if (!prod) {
  var LiveReloadPlugin = require('webpack-livereload-plugin');
  config.plugins.push(new LiveReloadPlugin({ 'appendScriptTag': true }));
}

module.exports = config;