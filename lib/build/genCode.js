var async = require('async'),
    fs    = require('fs'),
    path  = require('path'),
    _  = require('../util');

var regDependency = /\s*_\(['"]([\w\s\$]+)['"]\);/;

module.exports = function (fnName, codeTpl, options, cb)
{
    var percentage = options.shareData.fnPercentage[fnName];

    percentage = percentage ? ' (' + percentage + ')' : '';

    _.log('Generate code "' + fnName + '"' + percentage + '.');

    var result = {},
        paths = _.map(options.libPaths, function (libPath)
        {
            return path.resolve(libPath, fnName + '.js');
        });

    async.detect(paths, fs.exists, function (path)
    {
        if (_.isUndef(path)) return cb('Not found: ' + fnName);

        fs.readFile(path, options.encoding, function (err, data)
        {
            if (err) return cb(err);

            var dependencies = regDependency.exec(data);
            dependencies = dependencies ? dependencies[1].split(/\s/) : [];

            data = data.replace(regDependency, '');
            data = data.replace(/\r\n|\n/g, '\n    ');

            var depStr = '', params = '';

            for (var i = 0, len = dependencies.length; i < len; i++)
            {
                depStr += "'" + dependencies[i] + "'";
                params += dependencies[i];
                if (i !== len - 1)
                {
                    depStr += ', ';
                    params += ', ';
                }
            }

            data = codeTpl({
                name  : fnName,
                depStr: depStr,
                params: params,
                code  : data
            });

            result.dependencies = dependencies;
            result.name         = fnName;
            result.code         = data;

            cb(null, result);
        });
    });
};