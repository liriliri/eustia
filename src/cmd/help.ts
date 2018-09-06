var readTpl = require('./share/readTpl')

var async = require('async')

var logger = require('../lib/logger')

module.exports = function(options, cb) {
  async.waterfall(
    [
      function(cb) {
        readTpl(['help', 'helpCmd'], cb)
      },
      function(tpl, cb) {
        options.command
          ? output(options.command, tpl['helpCmd'], cb)
          : outputAll(tpl['help'], cb)
      }
    ],
    function(err) {
      cb(err)
    }
  )
}

function outputAll(tpl, cb) {
  logger.log(tpl(require('./help/all')))

  cb()
}

function output(name, tpl, cb) {
  try {
    var data = require('./help/' + name)
  } catch (e) {
    return cb(new Error('Command not found: ' + name))
  }

  logger.log(tpl(data))

  cb()
}
