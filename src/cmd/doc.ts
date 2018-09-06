import * as async from 'async'
import * as path from 'path'
import extractCmt from './doc/extractCmt'

var readDesc = require('./doc/readDesc'),
  readTpl = require('./share/readTpl'),
  output = require('./doc/output')

module.exports = function(options, cb) {
  var template,
    ast = {}

  options.output = path.resolve(options.cwd, options.output)
  if (options.description)
    options.description = path.resolve(options.cwd, options.description)

  var docTpl = 'doc'
  if (options.format === 'md') docTpl = 'docMd'

  async.waterfall(
    [
      function(cb) {
        readTpl([docTpl], cb)
      },
      function(tpl, cb) {
        template = tpl[docTpl]
        cb()
      },
      function(cb) {
        extractCmt(ast, options, cb)
      },
      function(cb) {
        readDesc(ast, options, cb)
      },
      function(cb) {
        output(ast, template, options, cb)
      }
    ],
    function(err) {
      cb(err)
    }
  )
}

module.exports.defOpts = {
  input: 'util' + '.js',
  output: 'doc.html',
  title: 'Eustia Documentation',
  format: 'html'
}
