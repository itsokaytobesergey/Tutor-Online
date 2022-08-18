const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const getAllFiles = dir =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const baseName = path.basename(name);
    const isDirectory = fs.statSync(name).isDirectory();

    const item = {
      dir: path.basename(path.dirname(name)),
      name: file,
    };

    if (isDirectory) {
      return baseName !== 'includes' ? [...files, ...getAllFiles(name)] : [...files];
    } else {
      return baseName !== 'includes' ? [...files, item] : [...files];
    }
  }, []);

function generateHtmlPlugins(templateDir) {
  const files = getAllFiles(path.resolve(__dirname, templateDir), []).filter(file => !!file.name.split('.')[0]);
  const hash = (+new Date()).toString(36);

  return files.map(item => {
    const parts = item.name.split('.');
    const name = parts[0];
    const extension = parts[1];

    const itemDirString = item.dir === 'html' ? '' : `/${item.dir}`;

    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `./src/html${itemDirString}/${name}.${extension}`),
      inject: false,
      minify: false,
      templateParameters: {
        hash: hash,
      },
    });
  });
}

const htmlPlugins = generateHtmlPlugins('./src/html');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'production' ? false : true;

  const config = {
    devServer: {
      host: '0.0.0.0',
      port: 8080,
    },
    entry: ['./src/js/main.js', './src/scss/styles.scss'],
    output: {
      filename: './static/js/bundle.js',
    },
    devtool: isDev ? 'source-map' : false,
    mode: 'production',
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            sourceMap: isDev,
          },
          extractComments: true,
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules|bower_components/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                  '@babel/plugin-proposal-private-methods',
                  '@babel/plugin-syntax-dynamic-import',
                  '@babel/plugin-transform-runtime',
                ],
              },
            },
          ],
        },
        {
          test: /\.(sass|scss)$/,
          include: path.resolve(__dirname, 'src/scss'),
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {},
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDev,
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDev,
                postcssOptions: {
                  plugins: [
                    require('cssnano')({
                      preset: [
                        'default',
                        {
                          discardComments: {
                            removeAll: true,
                          },
                        },
                      ],
                    }),
                  ],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          include: path.resolve(__dirname, 'src/html/includes'),
          use: ['raw-loader'],
        },
        {
          test: /sprite\/.*\.svg$/, // your icons directory
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: './static/images/sprite.svg',
              },
            },
            'svg-transform-loader',
            'svgo-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: './static/css/styles.css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/favicon',
            to: './static/favicon',
          },
          {
            from: './src/images',
            to: './static/images',
          },
          {
            from: './src/fonts',
            to: './static/fonts',
          },
        ],
      }),
      new SpriteLoaderPlugin({
        plainSprite: true,
      }),
    ].concat(htmlPlugins),
  };

  if (!isDev) {
    config.plugins.push(new CleanWebpackPlugin());
  }

  return config;
};
