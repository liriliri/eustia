import logger from '../lib/logger'

export default function(options: any, cb: Function) {
  logger.log('eustia ' + options.packInfo.version)

  cb()
}
