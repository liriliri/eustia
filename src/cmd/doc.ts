import async from 'async'
import path from 'path'
import readTpl from '../lib/readTpl'
import extractCmt from './doc/extractCmt'
import output from './doc/output'
import readDesc from './doc/readDesc'

export default function doc(options: any, cb: Function) {
  let template: any
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
      function(cb: Function) {
        readTpl([docTpl], cb)
      },
      function(tpl: any, cb: Function) {
        template = tpl[docTpl]
        cb()
      },
      function(cb: Function) {
        extractCmt(ast, options, cb)
      },
      function(cb: Function) {
        readDesc(ast, options, cb)
      },
      function(cb: Function) {
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
