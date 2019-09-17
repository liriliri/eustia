import async from 'async'
import logger from '../lib/logger'
import readTpl from '../lib/readTpl'

export default function(options: any, cb: Function) {
  async.waterfall(
    [
      function(cb: Function) {
        readTpl(['help', 'helpCmd'], cb)
      },
      function(tpl: any, cb: Function) {
        options.command
          ? output(options.command, tpl.helpCmd, cb)
          : outputAll(tpl.help, cb)
      }
    ],
    function(err) {
      cb(err)
    }
  )
}

function outputAll(tpl: any, cb: Function) {
  logger.log(tpl(require('./help/all')))

  cb()
}

function output(name: string, tpl: any, cb: Function) {
  let data
  try {
    data = require('./help/' + name)
  } catch (e) {
    return cb(new Error('Command not found: ' + name))
  }

  logger.log(tpl(data))

  cb()
}
