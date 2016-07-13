var async = require('async');

var logger = require('../lib/logger'),
    util = require('../lib/util'),
    searchRepo = require('./install/searchRepo'),
    downloadFile = require('./install/downloadFile');

function exports(options, cb)
{
    if (util.isEmpty(options.modules))
    {
        logger.warn('You need to specify at least one module name.');
        return cb();
    }

    async.waterfall([
        function (cb)
        {
            searchRepo(options, cb);
        },
        function (installRepos, cb)
        {
            downloadFile(installRepos, options, cb);
        }
    ], function (err)
    {
        cb(err);
    });
}

exports.defOpts = {
    modules: []
};

module.exports = exports;