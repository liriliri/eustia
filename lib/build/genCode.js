var async = require('async'),
    path  = require('path'),
    fs = require('fs'),
    _  = require('../util');

var regDependency = /^\s*_\(['"][\w\s\$]+['"]\);/;

module.exports = function (funcName, codeTpl, options, callback)
{
    _.log('Generating code ' + funcName + '...');

    var result = {};

    var paths = [];

    paths.push(path.resolve(options.cwd, 'eustia/' + funcName + '.js'));
    if (options.external) paths.push(path.resolve(options.external, funcName + '.js'));
    paths.push(path.resolve(options.dirname, 'src/' + funcName + '.js'));

    async.detect(paths, fs.exists, function (path)
    {
        if (_.isUndef(path)) _.log.err('Not found: ' + funcName);
        fs.readFile(path, options.encoding, function (err, data)
        {
            if (err) return callback(err);

            data = _.stripComments(data);

            var dependencies = regDependency.exec(data);
            dependencies = dependencies ? dependencies[0]
                .replace(/^\s+|\s+$|'|"|;|_\(|\)|/g, '')
                .split(/\s/) : [];

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
                name  : funcName,
                depStr: depStr,
                params: params,
                code  : data
            });

            result.dependencies = dependencies;
            result.name         = funcName;
            result.code         = data;

            callback(null, result);
        });
    });
};