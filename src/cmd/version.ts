import logger from '../lib/logger'

export default function(options, cb) {
  logger.log('eustia ' + options.packInfo.version)

  cb()
}
