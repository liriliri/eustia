var fs     = require('fs'),
    path   = require('path'),
    async  = require('async'),
    logger = require('./logger');

var exports = {};

var resolve = path.resolve;

exports.readFiles = function (files)
{
    exports.getFiles(files, function (files)
    {

    });
};

exports.getFiles = function (files, callback)
{
    var list = [];

    var walker = async.queue(function (path, callback)
    {
        fs.stat(path, function (err, stat)
        {
            if (err) return callback(err);

            if (stat.isDirectory())
            {
                fs.readdir(path, function (err, files)
                {
                    if (err)
                    {
                        callback(err);
                    } else
                    {
                        for (var i = 0, len = files.length; i < len; i++)
                        {
                            walker.push(resolve(path, files[i]));
                        }
                        callback();
                    }
                });
            } else
            {
                list.push(path);
                callback();
            }
        });
    }, 50);

    for (var i = 0, len = files.length; i < len; i++) walker.push(files[i]);

    walker.drain = function () { callback(list) };
};

module.exports = exports;