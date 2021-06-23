/* eslint-disable global-require, import/no-extraneous-dependencies */
// postcss.config.js
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    tailwindcss('./tailwind.js'),
    require('autoprefixer'),
  ],
};
