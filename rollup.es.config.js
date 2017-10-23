import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/react-router-scroll-4.es.js',
    format: 'es',
  },
  plugins: [babel()],
};
