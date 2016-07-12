var async = require('async'),
    fs = require('fs'),
    path = require('path');

var downloadMod = require('../../lib/downloadMod'),
    logger = require('../../lib/logger'),
    util = require('../../lib/util');

var regDependency = /\s*\b_\(['"]([\w\s\$]+)['"]\);?/;

module.exports = function (modName, codeTpl, options, cb)
{
    var fnPercentage = options.data.fnPercentage,
        percentage;

    if(util.has(fnPercentage, modName)) percentage = fnPercentage[modName];

    percentage = percentage ? ' (' + percentage + ')' : '';

    var result = {},
        hasTryDownload = false,
        paths = [];

    util.each(options.libPaths, function (libPath)
    {
        util.each(options.extension, function (extension)
        {
            paths.push(path.resolve(libPath, modName + '.' + extension));
        });
    });

    function detectAndGenCode()
    {
        async.detect(paths, fs.exists, function (filePath)
        {
            if (util.isUndef(filePath))
            {
                if (!hasTryDownload)
                {
                    hasTryDownload = true;

                    logger.log('Install ' + modName + '.');

                    var dest = path.resolve(options.dirname, 'cache', modName + '.js');

                    return downloadMod(modName, dest, function (err)
                    {
                        if (err) return cb(err);

                        logger.info(modName + ' installed.');

                        detectAndGenCode();
                    });
                }

                return cb('Not found: ' + modName);
            }

            fs.readFile(filePath, options.encoding, function (err, data)
            {
                if (err) return cb(err);

                data = transData(filePath, data, modName, options);

                var dependencies = regDependency.exec(data);
                dependencies = dependencies ? util.trim(dependencies[1]).split(/\s/) : [];

                data = util.indent(data.replace(regDependency, ''));
                data = codeTpl({
                    name: modName,
                    code: util.trim(data),
                    exports: /\bexports\b/.test(data)
                });

                result.dependencies = dependencies;
                result.name = modName;
                result.code = data;

                logger.tpl({
                    modName: modName,
                    percentage: percentage,
                    dependencies: util.isEmpty(dependencies) ? '' : ' <= ' + dependencies.join(' ')
                }, 'BUILD MODULE {{#cyan}}{{{modName}}}{{/cyan}}{{{dependencies}}}{{{percentage}}}');

                cb(null, result);
            });
        });
    }

    detectAndGenCode();
};

function transData(filePath, src, modName, options)
{
    var transpiler = options.transpiler;

    util.each(transpiler, function (item)
    {
        if (item.exclude && item.exclude.test(filePath)) return;

        if (item.test.test(filePath))
        {
            util.each(item.handler, function (handler)
            {
                src = handler.call(item, src, modName);
            });
        }
    });

    return src;
}

