var _ = require('../util');

module.exports = function (options, cb)
{
    _.log('Scan source code: \n' + options.files.join('\n'));

    var regMethod = new RegExp('\\b' + options.namespace + '\\.[\\$\\w]+', 'g'),
        files  = options.files,
        fnList = options.include,
        i, len;

    _.readPaths(files, options, function (err, files)
    {
        if (err) return cb(err);

        for (i = 0, len = files.length; i < len; i++)
        {
            if (_.startWith(files[i], options.magicNum)) continue;

            var methods = files[i].match(regMethod);
            if (!methods) continue;

            fnList = fnList.concat(methods);
        }

        fnList = _.unique(fnList);

        fnList = _.filter(fnList, function (fnName)
        {
            return !_.contains(options.exclude, fnName);
        });

        _.each(fnList, function (val, idx)
        {
            fnList[idx] = val.substr(options.namespace.length + 1);
        });

        _.log('Methods found: ' + JSON.stringify(fnList));

        cb(null, fnList);
    });
};