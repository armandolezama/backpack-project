import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/bag-cell-component.js',
  output: {
    file: 'bag-cell-component-bundle.js',
    format: 'umd',
    name: 'BagCellComponentBundled'
  },
  plugins: [ resolve() ]
};