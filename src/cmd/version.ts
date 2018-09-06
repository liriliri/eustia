var logger = require('../lib/logger')

module.exports = function(options, cb) {
  logger.log('eustia ' + options.packInfo.version)

  cb()
}

module.exports.defOpts = {}
