import * as fs from 'fs'

export default function(ast: any, options: any, cb: Function) {
  if (!options.description) {
    ast.description = ''
    return cb()
  }

  fs.readFile(options.description, options.encoding, function(err, data) {
    if (err) {
      return cb(err)
    }

    ast.description = data

    cb()
  })
}
