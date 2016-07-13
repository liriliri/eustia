var async = require('async'),
    glob = require('glob');

function exports(options, cb)
{
    async.waterfall([
        function (cb)
        {
            glob();
        }
    ], function (err)
    {

    });
}

module.exports = exports;