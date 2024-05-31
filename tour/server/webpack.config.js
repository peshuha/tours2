const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
<<<<<<< HEAD:tour/server/tour/webpack.config.js
    path: join(__dirname, '../dist'),
    // path00: join(__dirname, '../../dist/server/tour'),
=======
    path: join(__dirname, '../dist/server/tour'),
>>>>>>> a7cdc1d4547d926c2daac733fba0b1a8db41d291:tour/server/webpack.config.js
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
    }),
  ],
};
