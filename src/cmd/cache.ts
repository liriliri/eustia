import * as async from 'async'
import logger from '../lib/logger'
import clear from './cache/clear'

export default function cache(options, cb) {
  async.waterfall(
    [
      function(cb) {
        switch (options.subCmd) {
          case 'clear':
            clear(cb)
            break
          default:
            logger.warn('No sub command is specified')
            cb()
        }
      }
    ],
    function(err) {
      cb(err)
    }
  )
}

;(cache as any).defOpts = {
  subCmd: ''
}
