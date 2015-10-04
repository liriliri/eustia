var fs     = require('fs'),
    path   = require('path'),
    async  = require('async'),
    logger = require('./logger');

var exports = {};

var resolve = path.resolve;

exports.readPaths = function (paths, callback)
{
    logger('Reading paths...');

    exports.expandPaths(paths, function (err, files)
    {
        if (err) return callback(err);

        async.map(files, function (file, callback)
        {
            fs.readFile(file, 'utf-8', function (err, data)
            {
                if (err) return callback(err);

                callback(null, data);
            });
        }, function (err, results)
        {
            if (err) return callback(err);

            callback(null, results);
        });
    });
};

exports.expandPaths = function (paths, callback)
{
    logger('Expanding paths...');

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

                    for (var i = 0, len = files.length; i < len; i++)
                    {
                        walker.push(resolve(path, files[i]));
                    }
                    callback();
                });
                return;
            }

            files.push(path);
            callback();
        });
    }, 50);

    for (var i = 0, len = paths.length; i < len; i++) walker.push(paths[i]);

    walker.drain = function () { callback(null, files) };
};

module.exports = exports;