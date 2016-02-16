var path = require('path'),
    _ = require('../../lib/util');

module.exports = function (options, cb)
{
    var repoPath = path.resolve(__dirname, '../../repo/*');

    _.readPaths([repoPath], options, function (err, files)
    {
        if (err) return cb(err);

        var repoData = [];

        _.each(files, function (file)
        {
            repoData = repoData.concat(JSON.parse(file.data));
        });

        cb(null, repoData);
    });
};