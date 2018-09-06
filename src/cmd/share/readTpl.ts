import * as handlebars from 'handlebars'
import * as async from 'async'
import * as path from 'path'
import * as fs from 'fs'
import logger from '../../lib/logger'

let tpl = {}

function readTpl(tplName) {
  let tplPath = path.resolve(__dirname, '../../../tpl/' + tplName + '.hbs')

  return function(cb) {
    logger.debug('Read tpl', tplPath)

    fs.readFile(tplPath, 'utf8', function(err, data) {
      if (err) return cb(err)

      tpl[tplName] = handlebars.compile(data, { noEscape: true })

      cb()
    })
  }
}

export default function(templates, cb) {
  let callbacks = templates.map(function(val) {
    return readTpl(val)
  })

  async.parallel(callbacks, function(err) {
    if (err) return cb(err)

    cb(null, tpl)
  })
}
