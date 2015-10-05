var fs     = require('fs'),
    path   = require('path'),
    async  = require('async'),
    _      = require('./util'),
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

                    _.each(files, function (val)
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

module.exports = exports;