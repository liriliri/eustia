import * as fs from 'fs'
import * as marked from 'marked'
import * as util from '../../lib/util'
import logger from '../../lib/logger'

marked.setOptions({
  renderer: new marked.Renderer(),
  langPrefix: 'language-'
})

export default function(ast, template, options, cb) {
  logger.tpl(
    {
      output: options.output
    },
    'OUTPUT FILE {{#cyan}}{{{output}}}{{/cyan}}'
  )

  ast.title = options.title

  // If the output type is not markdown, convert data in markdown format.
  if (options.format !== 'md') {
    if (ast.description) ast.description = marked(ast.description)

    util.each(ast.docs, function(val, key) {
      ast.docs[key] = marked(val)
    })
  }

  let data =
    options.format === 'json' ? JSON.stringify(ast, null, 4) : template(ast)

  fs.writeFile(options.output, data, options.encoding, function(err) {
    if (err) return cb(err)
    cb()
  })
}
