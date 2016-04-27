_('each');

var async = require('async'),
    fs = require('fs'),
    glob = require('glob');

function expandPaths(paths, options, cb)
{
    var files = [];

    var walker = async.queue(function (path, cb)
    {
        glob(path, {
            ignore: options.ignore
        }, function (err, result)
        {
            if (err) return cb(err);

            files = files.concat(result);

            cb();
        });
    }, 50);

    each(paths, function (val) { walker.push(val) });

    walker.drain = function () { cb(null, files) };
}

exports = function (paths, options, cb)
{
    expandPaths(paths, options, function (err, files)
    {
        if (err) return cb(err);

        async.map(files, function (file, cb)
        {
            fs.readFile(file, options.encoding, function (err, data)
            {
                if (err) return cb(err);

                cb(null, { path: file, data: data });
            });
        }, function (err, results)
        {
            if (err) return cb(err);

            cb(null, results);
        });
    });
};