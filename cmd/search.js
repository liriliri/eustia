var async = require('async'),
    _ = require('../lib/util');

var updateEris = require('./search/updateEris'),
    searchRepo = require('./search/searchRepo'),
    showResult = require('./search/showResult');

function exports(options, cb)
{
    if (!options.keyword)
    {
        _.log.warn('Search keyword is required.');
        return cb();
    }

    async.waterfall([
        function (cb) { updateEris(options, cb) },
        function (repoData, cb) { searchRepo(repoData, options, cb) },
        showResult
    ], function (err)
    {
        if (err) return cb(err);

        cb();
    });
}

exports.defOpts = {
    update: false
};

module.exports = exports;