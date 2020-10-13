module.exports = {
  output: 'src/lib/util.js',
  files: ['src/**/*.ts'],
  include: ['each', 'extend', 'has', 'isEmpty', 'isPlainObj', 'some'],
  exclude: ['js'],
  format: 'commonjs',
  removeComments: true,
  ts: true,
  sourcemap: true
}
