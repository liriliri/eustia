var async = require('async');

var logger = require('../lib/logger'),
    clear = require('./cache/clear');

function exports(options, cb) {
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

exports.defOpts = {
    subCmd: ''
};

module.exports = exports;
