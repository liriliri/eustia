import * as fs from 'fs'
import * as marked from 'marked'
import logger from '../../lib/logger'
import * as util from '../../lib/util'

marked.setOptions({
  renderer: new marked.Renderer(),
  langPrefix: 'language-'
})

export default function(ast: any, template: any, options: any, cb: Function) {
  logger.tpl(
    {
      output: options.output
    },
    'OUTPUT FILE {{#cyan}}{{{output}}}{{/cyan}}'
  )

  ast.title = options.title

  // If the output type is not markdown, convert data in markdown format.
  if (options.format !== 'md') {
    if (ast.description) {
      ast.description = marked(ast.description)
    }

    util.each(ast.docs, function(val: string, key) {
      ast.docs[key] = marked(val)
    })
  }

  const data =
    options.format === 'json' ? JSON.stringify(ast, null, 4) : template(ast)

  fs.writeFile(options.output, data, options.encoding, function(err) {
    if (err) {
      return cb(err)
    }
    cb()
  })
}
