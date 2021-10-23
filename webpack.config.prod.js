const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const TerserJSPlugin = require('terser-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const cssNano = require('cssnano');
const BrotliPlugin = require('brotli-webpack-plugin');

class FileMergeWebpackPlugin {
  constructor({ files, destination, removeSourceFiles }) {
    this.files = files;
    this.destination = destination;
    this.removeSourceFiles = removeSourceFiles;
  }

  apply(compiler) {
    const fileBuffers = [];
    compiler.hooks.afterEmit.tap('FileMergeWebpackPlugin', () => {
      this.files
        .filter(file => fs.existsSync(file))
        .forEach(file => fileBuffers.push(fs.readFileSync(file)))

      fs.writeFileSync(this.destination, fileBuffers.join(""), {});

      if (this.removeSourceFiles) {
        this.files.forEach(file => fs.unlinkSync(file));
      }
    });

    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      // Static Plugin interface |compilation |HOOK NAME | register listener
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        'MyPlugin', // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          // Manipulate the content
          if (data.plugin !== undefined) {
            // data.assets.css = ['assets/styles/app.min.css', 'assets/styles/criticalCSS.min.css'];
            data.assets.js = ['scripts/app.min.js'];
            // Tell webpack to move on
            cb(null, data);
          }
        }
      )
    })
  }
};

const entry = {
  main: './app/scripts/main.js',
};

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
      production: true,
    }));
  });
  return templates;
};

const dynamic = glob
  .sync('./app/scripts/widgets/*.js')
  .reduce((a, b) => Object.assign(a, {
    [`widgets/${path.basename(b, '.js')}`]: b,
  }), {});

Object.assign(entry, dynamic);


module.exports = {
  mode: 'production',
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].min.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        // vendor chunk
        vendor: {
          test: /[\\/]node_modules[\\/]/, ///< put all used node_modules modules in this chunk
          name: "vendor", ///< name of bundle
          chunks: "all", ///< type of code to put in this bundle
        },
        core: {
          name: 'core',
          chunks: 'all',
          reuseExistingChunk: true,
          enforce: true,
          test: /(core)/,
        },
        // criticalCSS: {
        //   name: 'criticalCSS',
        //   test: /criticalCSS\.s?css$/,
        //   chunks: 'all',
        //   enforce: true,
        // },
      },
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
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: 'css-loader',
        options: {
          url: (url) => {
            // if (url.includes('fonts')) return;
            // const n = url.split('/');
            // console.log('urlImage', url);

          },
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
      }],
    }, {
      test: /.(images.*).(png|jpe?g|gif|svg|webp)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: (url) => {
            return `images/${url}`;
          },
        },
      }],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].min.css',
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssNano,
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
    new CopyWebpackPlugin([{
      from: 'app/images/',
      to: 'images/',
    }, {
      from: 'app/fonts/',
      to: 'fonts/',
    }]),
  ].concat(pugGenerate()).concat([
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),

    // new BrotliPlugin({
    //   asset: '[path].br[query]',
    //   test: /\.(js|css|html|svg)$/,
    //   threshold: 10240,
    //   quality: 11,
    //   minRatio: 0.8
    // }),

    // js
    new FileMergeWebpackPlugin({
      destination: 'dist/scripts/app.min.js',
      removeSourceFiles: true,
      files: [
        'dist/scripts/vendor.min.js',
        // 'dist/scripts/criticalCSS.min.js',
        // 'dist/scripts/core.min.js',
        'dist/scripts/main.min.js',
      ]
    }),
    // css
    // new FileMergeWebpackPlugin({
    //   destination: 'dist/assets/styles/app.min.css',
    //   removeSourceFiles: true,
    //   files: [
    //     'dist/assets/styles/main.min.css',
    //   ]
    // }),
  ]),
}