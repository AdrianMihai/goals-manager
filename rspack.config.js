const { rspack } = require('@rspack/core');
const { TsCheckerRspackPlugin } = require('ts-checker-rspack-plugin');
const path = require('path')

module.exports = {
  entry: {
    main: './src/main.tsx'
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
              tsx: true
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
        options: { typescript: true }
      },
    ],
  },
  plugins: [new TsCheckerRspackPlugin(), new rspack.HtmlRspackPlugin({
    template: 'public/index.html',
    chunks: ['main']
  })],
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
  }
}