import * as async from 'async'
import * as fs from 'fs'
import * as glob from 'glob'
import logger from './logger'

function expandPaths(paths: string[], options: any, cb: Function) {
  let files: string[] = []

  const walker = async.queue(function(path: string, cb) {
    glob(
      path,
      {
        ignore: options.ignore
      },
      function(err, result) {
        logger.debug('Expand path', path, 'to', result)

        if (err) {
          return cb(err)
        }

        files = files.concat(result)

        cb()
      }
    )
  }, 50)

  paths.forEach(function(val: string) {
    walker.push(val)
  })

  walker.drain = function() {
    cb(null, files)
  }
}

export default function(paths: string[], options: any, cb: Function) {
  expandPaths(paths, options, function(err: null | Error, files: string[]) {
    if (err) {
      return cb(err)
    }

    async.map(
      files,
      function(file: string, cb: Function) {
        fs.readFile(file, options.encoding, function(err, data) {
          if (err) {
            return cb(err)
          }

          cb(null, {
            path: file,
            data
          })
        })
      },
      function(err, results) {
        if (err) {
          return cb(err)
        }

        cb(null, results)
      }
    )
  })
}
