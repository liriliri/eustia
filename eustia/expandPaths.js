'each';

var async = require('async'),
    fs    = require('fs'),
    path  = require('path');

var resolve = path.resolve;

exports = function (paths, callback)
{
    var files = [];

    var walker = async.queue(function (path, callback)
    {
        fs.stat(path, function (err, stat)
        {
            if (err) return callback(err);

            if (stat.isDirectory())
            {
                fs.readdir(path, function (err, files)
                {
                    if (err) return callback(err);

                    each(files, function (val)
                    {
                        walker.push(resolve(path, val));
                    });
                    callback();
                });
                return;
            }

            files.push(path);
            callback();
        });
    }, 50);

    _.each(paths, function (val) { walker.push(val) });

    walker.drain = function () { callback(null, files) };
};