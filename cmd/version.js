var _ = require('../lib/util');

function exports(options, cb)
{
    _.log('eustia ' + options.packInfo.version);

    cb();
}

exports.defOpts = {};

module.exports = exports;
