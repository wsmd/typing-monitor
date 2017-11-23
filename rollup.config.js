/* eslint no-console: 0 */

import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import compact from 'lodash.compact';
import pkg from './package.json';

const prod = process.env.PRODUCTION;
const esbundle = process.env.ES;
const cjs = process.env.CJS;
const umd = process.env.UMD;

const config = {
  input: 'src/index.js',
  name: 'TypingMonitor',
};

const base = pkg.main.split('.')[0];
if (esbundle) {
  console.log('\nCreating ES bundle...');
  config.output = { format: 'es', file: pkg.module };
} else if (cjs) {
  console.log('\nCreating production CJS bundle...');
  config.output = { format: 'cjs', file: pkg.main };
} else if (umd && prod) {
  console.log('\nCreating development UMD bundle...');
  config.output = { format: 'umd', file: `${base}.umd.js` };
} else if (umd) {
  console.log('\nCreating production UMD bundle...');
  config.output = { format: 'umd', file: `${base}.umd.min.js` };
}

if (umd) config.sourcemap = true;

config.plugins = compact([
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

export default config;
