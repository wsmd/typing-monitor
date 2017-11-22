/* eslint no-console: 0 */

import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const compact = arr => arr.filter(Boolean);

const prod = process.env.PRODUCTION;
const esbundle = process.env.ESBUNDLE;

let output;
if (prod) {
  console.log('\nCreating production UMD bundle...');
  output = [{ file: 'dist/typing-monitor.min.js', format: 'umd' }];
} else if (esbundle) {
  console.log('\nCreating production ES bundle...');
  output = [{ file: 'dist/typing-monitor.es.js', format: 'es' }];
} else {
  console.log('\nCreating development UMD bundle...');
  output = [{ file: 'dist/typing-monitor.js', format: 'umd' }];
}

const plugins = compact([
  babel({
    babelrc: false,
    presets: [
      ['env', { modules: false }],
      'flow',
    ],
    plugins: [
      'external-helpers',
    ],
  }),
  prod && uglify(),
]);

const config = {
  input: 'src/index.js',
  name: 'TypingMonitor',
  plugins,
  output,
};

export default config;
