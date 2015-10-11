var _ = require('./util');

exports.generate = require('./generate');
exports.install  = require('./install');
exports.help     = require('./help');
exports.update   = require('./update');

exports.version = function (options)
{
    _.log('eustia ' + options.packInfo.version);
};