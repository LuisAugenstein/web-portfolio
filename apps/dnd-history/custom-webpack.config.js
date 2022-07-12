const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      IMG_BB_API_KEY: process.env.IMG_BB_API_KEY,
    }),
  ],
};
