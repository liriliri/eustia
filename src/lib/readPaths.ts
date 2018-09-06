var async = require('async'),
  fs = require('fs'),
  glob = require('glob')

var logger = require('./logger')

function expandPaths(paths, options, cb) {
  var files = []

  var walker = async.queue(function(path, cb) {
    glob(
      path,
      {
        ignore: options.ignore
      },
      function(err, result) {
        logger.debug('Expand path', path, 'to', result)

        if (err) return cb(err)

        files = files.concat(result)

        cb()
      }
    )
  }, 50)

  paths.forEach(function(val) {
    walker.push(val)
  })

  walker.drain = function() {
    cb(null, files)
  }
}

module.exports = function(paths, options, cb) {
  expandPaths(paths, options, function(err, files) {
    if (err) return cb(err)

    async.map(
      files,
      function(file, cb) {
        fs.readFile(file, options.encoding, function(err, data) {
          if (err) return cb(err)

          cb(null, {
            path: file,
            data: data
          })
        })
      },
      function(err, results) {
        if (err) return cb(err)

        cb(null, results)
      }
    )
  })
}
