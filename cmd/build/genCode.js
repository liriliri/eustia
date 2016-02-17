var async = require('async'),
    fs = require('fs'),
    path = require('path'),
    _ = require('../../lib/util');

var regDependency = /\s*(_|include)\(['"]([\w\s\$]+)['"]\);?/;

module.exports = function (modName, codeTpl, options, cb)
{
    var percentage = options.shareData.fnPercentage[modName];

    percentage = percentage ? ' (' + percentage + ')' : '';

    _.log({}, 'Generate code {{#cyan}}"' + modName + '"' + percentage + '{{/cyan}}');

    var result = {}, paths = [];

    _.each(options.libPaths, function (libPath)
    {
        _.each(options.extension, function (extension)
        {
            paths.push(path.resolve(libPath, modName + '.' + extension));
        });
    });

    async.detect(paths, fs.exists, function (filePath)
    {
        if (_.isUndef(filePath)) return cb('Not found: ' + modName);

        fs.readFile(filePath, options.encoding, function (err, data)
        {
            if (err) return cb(err);

            data = transData(filePath, data, modName, options);

            var dependencies = regDependency.exec(data);
            dependencies = dependencies ? dependencies[2].split(/\s/) : [];

            data = data.replace(regDependency, '');
            data = data.replace(/\r\n|\n/g, '\n    ');
            data = codeTpl({name: modName, code: data});

            result.dependencies = dependencies;
            result.name = modName;
            result.code = data;

            cb(null, result);
        });
    });
};

function transData(filePath, src, modName, options)
{
    var transpiler = options.transpiler;

    _.each(transpiler, function (item)
    {
        if (item.exclude && item.exclude.test(filePath)) return;

        if (item.test.test(filePath))
        {
            _.each(item.handler, function (handler)
            {
                src = handler.call(item, src, modName);
            });
        }
    });

    return src;
}
