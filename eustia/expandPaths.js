_('each');

var async = require('async'),
    glob  = require('glob');

expandPaths = function (paths, options, callback)
{
    var files = [];

    var walker = async.queue(function (path, callback)
    {
        glob(path, {
            ignore: ['util.js']
        }, function (err, result)
        {
            if (err) return callback(err);

            files = files.concat(result);

            callback();
        });
    }, 50);

    _.each(paths, function (val) { walker.push(val) });

    walker.drain = function () { callback(null, files)};
};