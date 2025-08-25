const { rspack } = require('@rspack/core');
const { TsCheckerRspackPlugin } = require('ts-checker-rspack-plugin');
const path = require('path');
const { cp } = require('fs');

const IS_DEV = process.env.NODE_ENV === 'development';

const computePlugins = () => {
  const plugins = [
    new rspack.HtmlRspackPlugin({
      template: 'public/index.html',
      chunks: ['main'],
    }),
  ];

  if (IS_DEV) {
    plugins.push(
      new TsCheckerRspackPlugin(),
      new rspack.HotModuleReplacementPlugin({
        include: [/\.jsx$/, /\.tsx$/],
        exclude: [/node_modules/],
      })
    );
  }

  return plugins;
};

module.exports = {
  entry: {
    main: './src/main.tsx',
  },
  module: {
    rules: [
      {
        test: /\.(?:ts|tsx|js)$/,
        exclude: [/node_modules/],
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              jsx: true,
              tsx: true,
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
        options: { typescript: true },
      },
    ],
  },
  plugins: computePlugins(),
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts'],
    },
  },
  devServer: {
    open: true,
    compress: true,
    port: 9000,
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
  },
};
