const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');

module.exports = (config) => {
  const { env } = process;

  config.set({
    frameworks: ['mocha', 'sinon-chai'],

    files: [{ pattern: 'test/*.test.js', watched: false }],

    preprocessors: {
      'test/*.test.js': ['rollup'],
    },

    rollupPreprocessor: {
      plugins: [
        babel({ exclude: 'node_modules/**' }),
        resolve(),
        commonjs({ include: 'node_modules/**' }),
        replace({
          'process.env.NODE_ENV': JSON.stringify('test'),
        }),
      ],
      format: 'iife',
      name: 'reactRouterScroll',
      sourcemap: 'inline',
    },

    reporters: ['mocha'],

    mochaReporter: {
      output: 'minimal',
    },

    customLaunchers: {
      ChromeCi: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },

    browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome', 'Firefox'],
  });
};
