var async = require('async'),
    fs = require('fs'),
    path = require('path'),
    _ = require('../util');

var regDependency = /\s*_\(['"]([\w\s\$]+)['"]\);/;

module.exports = function (fnName, codeTpl, options, cb)
{
    var percentage = options.shareData.fnPercentage[fnName];

    percentage = percentage ? ' (' + percentage + ')' : '';

    _.log('Generate code "' + fnName + '"' + percentage + '.');

    var result = {}, paths = [];

    _.each(options.libPaths, function (libPath)
    {
        _.each(options.extension, function (extension)
        {
            paths.push(path.resolve(libPath, fnName + '.' + extension));
        });
    });

    async.detect(paths, fs.exists, function (filePath)
    {
        if (_.isUndef(filePath)) return cb('Not found: ' + fnName);

        fs.readFile(filePath, options.encoding, function (err, data)
        {
            if (err) return cb(err);

            data = transData(filePath, data, options);

            var dependencies = regDependency.exec(data);
            dependencies = dependencies ? dependencies[1].split(/\s/) : [];

            data = data.replace(regDependency, '');
            data = data.replace(/\r\n|\n/g, '\n    ');
            data = codeTpl({name: fnName, code: data});

            result.dependencies = dependencies;
            result.name = fnName;
            result.code = data;

            cb(null, result);
        });
    });
};

function transData(filePath, src, options)
{
    var transpiler = options.transpiler;

    _.each(transpiler, function (item)
    {
        if (item.exclude && item.exclude.test(filePath)) return;

        if (item.test.test(filePath))
        {
            _.each(item.handler, function (handler)
            {
                src = handler.call(item, src); 
            });
        }
    });

    return src;
}