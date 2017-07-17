import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    app: './src/index.jsx',
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 2 },
            },
            { loader: 'postcss-loader',
              options: {
                plugins() {
                  return [autoprefixer];
                },
              },
            },
            'sass-loader',

          ],
          publicPath: '/dist',
        }),
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpe?g|gif|png|svg)/,
        loader: 'file-loader',
      },
    ],
  },
  devServer: {
    compress: true,
    hot: true,
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      hash: true,
      minify: {
        collapseWhitespace: false,
      },
      favicon: 'favicon.ico',
    }),
    new ExtractTextPlugin({
      filename: 'app.bundle.css',
      disable: !isProd,
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].bundle.js',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    cheerio: 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
  },
};
