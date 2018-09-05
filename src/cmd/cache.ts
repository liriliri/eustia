var async = require('async');

var logger = require('../lib/logger'),
  clear = require('./cache/clear');

module.exports = function (options, cb) {
  async.waterfall(
    [
      function(cb) {
        switch (options.subCmd) {
          case 'clear':
            clear(cb);
            break;
          default:
            logger.warn('No sub command is specified');
            cb();
        }
      }
    ],
    function(err) {
      cb(err);
    }
  );
}

module.exports.defOpts = {
  subCmd: ''
};
