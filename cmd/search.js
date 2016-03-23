var async = require('async'),
    _ = require('../lib/util');

var searchRepo = require('./search/searchRepo'),
    showResult = require('./search/showResult');

function exports(options, cb)
{
    if (!options.keyword)
    {
        _.log.warn('Search keyword is required.');
        return cb();
    }

    _.log.ok('Searching "' + options.keyword + '":');

    async.waterfall([
        function (cb) { searchRepo(options, cb) },
        showResult
    ], function (err)
    {
        if (err) return cb(err);

        cb();
    });
}

exports.defOpts = {};

module.exports = exports;