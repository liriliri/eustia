var async = require('async'),
    _ = require('./util');

var readRepoData = require('./share/readRepoData'),
    searchRepo   = require('./install/searchRepo'),
    downloadFile = require('./install/downloadFile');

function exports(options, cb)
{
    if (options.utils.length === 0)
    {
        _.log.warn('You need to specify at least one function.');
        return cb();
    }

    async.waterfall([
        function (cb) { readRepoData(options, cb) },
        function (repoData, cb) { searchRepo(repoData, options, cb) },
        function (installRepos, cb) { downloadFile(installRepos, options, cb) }
    ], function (err)
    {
        if (err) return cb(err);

        cb();
    });
}

exports.defOpts = {
    utils   : []
};

module.exports = exports;