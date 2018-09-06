var glob = require('glob'),
  fs = require('fs'),
  async = require('async'),
  path = require('path')

var logger = require('../../lib/logger')

module.exports = function(cb) {
  glob(path.resolve(__dirname, '../../../cache/*.js'), {}, function(err, files) {
    if (err) return cb(err)

    async.eachSeries(
      files,
      function(file, cb) {
        fs.unlink(file, function(err) {
          if (!err)
            logger.tpl(
              {
                file: file
              },
              'DELETE CACHE {{#cyan}}{{{file}}}{{/cyan}}'
            )

          cb(err)
        })
      },
      function(err) {
        cb(err)
      }
    )
  })
}
