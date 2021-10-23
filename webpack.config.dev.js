require('core-js/stable');
require('regenerator-runtime/runtime');
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const port = process.env.PORT || 3001;

const pugGenerate = () => {
  const pugFiles = fs.readdirSync(path.resolve(__dirname, './app/views/pages'));
  const templates = [];
  pugFiles.map(x => {
    const [name, extension] = x.split('.');
    return templates.push(new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `./app/views/pages/${name}.${extension}`),
      minify: false,
      inject: true,
      production: false,
    }));
  });
  return templates;
};

const entry = {
  main: './app/scripts/main.js',
  // development: './app/scripts/development.js',
};

module.exports = {
  mode: 'development',
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
  },
  devtool: 'source-map',
  devServer: {
    port,
    contentBase: './app',
    watchContentBase: true,
    watchOptions: {
      ignored: ['test'],
    },
  },
  module: {
    rules: [{
      test: /\.pug$/,
      use: [{
        loader: 'pug-loader',
        query: {
          pretty: true,
          self: true,
          exports: false,
        },
      }]
    }, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
      },
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [{
        loader: 'style-loader',
        options: {
          sourceMap: true,
          hmr: true,
        },
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          autoprefixer: {
            browsers: ['last 2 versions'],
          },
          plugins: () => [
            AutoPrefixer('last 2 versions', 'ie >= 10'),
          ],
        },
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },],
    }, {
      test: /.(fonts.*).(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      }],
    }, {
      test: /.(images.*).(png|jpe?g|gif|svg|webp)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      }],
    }],
  },
  plugins: [].concat(pugGenerate()).concat([
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ]),
};