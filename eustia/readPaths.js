'expandPaths';

var fs    = require('fs'),
    async = require('async');

exports = function (paths, options, callback)
{
    expandPaths(paths, options, function (err, files)
    {
        if (err) return callback(err);

        async.map(files, function (file, callback)
        {
            fs.readFile(file, options.encoding, function (err, data)
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