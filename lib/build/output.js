var fs   = require('fs'),
    path = require('path'),
    _ = require('../util');

module.exports = function (codes, codesTpl, patternTpl, options, cb)
{
    var methodList = '', code = '';

    // Sort codes first so that the generated file stays the same
    // when no method is added or removed.
    codes = codes.sort(function (a, b)
    {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

        return 0;
    });

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

    methodList = methodList.replace(/\r\n|\n/g, '\n    ');

    var result = codesTpl({
        code      : code,
        methodList: methodList
    }).replace(/\r\n|\n/g, '\n    ');

    result = result.replace(/\n\s*\n/g, '\n\n');

    result = options.magicNum + ' ' + _.datetime() + '\n' +
             patternTpl({
                 namespace: options.namespace,
                 codes: result
             });

    _.log('Output file: ' + options.output);

    fs.writeFile(options.output, result, options.encoding, function (err)
    {
        if (err) return callback(err);
        cb();
    });
};