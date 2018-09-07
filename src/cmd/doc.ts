import * as async from 'async'
import * as path from 'path'
import readTpl from '../lib/readTpl'
import extractCmt from './doc/extractCmt'
import output from './doc/output'
import readDesc from './doc/readDesc'

export default function doc(options, cb) {
  let template
  const ast = {}

  options.output = path.resolve(options.cwd, options.output)
  if (options.description) {
    options.description = path.resolve(options.cwd, options.description)
  }

  let docTpl = 'doc'
  if (options.format === 'md') {
    docTpl = 'docMd'
  }

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

;(doc as any).defOpts = {
  input: 'util' + '.js',
  output: 'doc.html',
  title: 'Eustia Documentation',
  format: 'html'
}
