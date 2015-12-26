var _ = require('../util');

module.exports = function (options, callback)
{
    _.log('Scanning source code...');

    var regMethod = new RegExp('\\b' + options.name + '\\.[\\$\\w]+', 'g');

    var files = options.files;

    var funcList = [];

    _.readPaths(files, options, function (err, files)
    {
        if (err) return callback(err);

        for (var i = 0, len = files.length; i < len; i++)
        {
            var methods = files[i].match(regMethod);
            if (!methods) continue;

            funcList = funcList.concat(methods);
        }

        _.each(funcList, function (val, idx)
        {
            funcList[idx] = val.substr(options.name.length + 1);
        });

        callback(null, funcList);
    });
};