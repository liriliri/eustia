import * as async from 'async'
import * as fs from 'fs'
import * as handlebars from 'handlebars'
import * as path from 'path'
import logger from './logger'

const tpl: any = {}

function readTpl(tplName: string) {
  const tplPath = path.resolve(__dirname, '../../tpl/' + tplName + '.hbs')

  return function(cb: Function) {
    logger.debug('Read tpl', tplPath)

    fs.readFile(tplPath, 'utf8', function(err, data) {
      if (err) {
        return cb(err)
      }

      tpl[tplName] = handlebars.compile(data, { noEscape: true })

      cb()
    })
  }
}

export default function(templates: string[], cb: Function) {
  const callbacks = templates.map(function(val) {
    return readTpl(val)
  })

  async.parallel(callbacks, function(err) {
    if (err) {
      return cb(err)
    }

    cb(null, tpl)
  })
}
