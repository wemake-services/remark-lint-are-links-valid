const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')

module.exports = {
  format: 'cjs',
  plugins: [
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
