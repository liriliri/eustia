var logger = require('../lib/logger');

function exports(options, cb) {
    logger.log('eustia ' + options.packInfo.version);

    cb();
}

exports.defOpts = {};

module.exports = exports;
