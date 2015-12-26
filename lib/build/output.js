var fs = require('fs'),
    _  = require('../util');

module.exports = function (codes, resultTpl, options, callback)
{
    _.log('Outputting result...');

    var methodList = '', code = '';

    for (var i = 0, len = codes.length; i < len; i++)
    {
        methodList += "'" + codes[i].name + "'";
        code += codes[i].code;
        if (i !== len - 1)
        {
            methodList += ',\n';
            code += '\n\n';
        }
    }

    code       = code.replace(/\r\n|\n/g, '\n    ');
    methodList = methodList.replace(/\r\n|\n/g, '\n        ');

    var result = resultTpl({
        code      : code,
        name      : options.name,
        methodList: methodList
    });

    result = result.replace(/\n\s*\n/g, '\n\n');

    if (options.output)
    {
        var outPath = process.cwd() + '/' + options.output;

        fs.writeFile(outPath, result, options.encoding, function (err)
        {
            if (err) return callback(err);
            callback();
        });
    } else
    {
        _.log(result);
        callback();
    }
};