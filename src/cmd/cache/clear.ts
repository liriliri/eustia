import * as async from 'async'
import * as fs from 'fs'
import * as glob from 'glob'
import * as path from 'path'
import logger from '../../lib/logger'

export default function(cb) {
  glob(path.resolve(__dirname, '../../../cache/*.js'), {}, function(
    err,
    files
  ) {
    if (err) {
      return cb(err)
    }

    async.eachSeries(
      files,
      function(file, cb) {
        fs.unlink(file, function(err) {
          if (!err) {
            logger.tpl(
              {
                file
              },
              'DELETE CACHE {{#cyan}}{{{file}}}{{/cyan}}'
            )
          }

          cb(err)
        })
      },
      function(err) {
        cb(err)
      }
    )
  })
}
