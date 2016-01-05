var fs   = require('fs'),
    path = require('path'),
    _ = require('../util');

module.exports = function (codes, codesTpl, patternTpl, options, cb)
{
    var code = '',
        dependencyGraph = [],
        codesMap = {};

    // Sort codes first so that the generated file stays the same
    // when no method is added or removed.
    codes = codes.sort(function (a, b)
    {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

        return 0;
    });

    _.each(codes, function (code)
    {
        var dependencies = code.dependencies;

        dependencyGraph.push(['', code.name]);
        _.each(dependencies, function (dependency)
        {
            dependencyGraph.push([dependency, code.name]);
        });

        codesMap[code.name] = code.code
    });

    try {
        var codesOrder = _.topoSort(dependencyGraph);
    } catch(e)
    {
        _.log.err(e.message);
    }


    for (var i = 0, len = codesOrder.length; i < len; i++)
    {
        if (codesOrder[i] === '') continue;
        code += codesMap[codesOrder[i]];
        if (i !== len - 1) code += '\n\n';
    }

    var result = codesTpl({ code : code }).replace(/\r\n|\n/g, '\n    ');

    result = result.replace(/\n\s*\n/g, '\n\n');

    result = options.magicNum + '\n' +
             patternTpl({
                 namespace: options.namespace,
                 codes: result
             });

    _.log('Output file: ' + options.output);

    fs.writeFile(options.output, result, options.encoding, function (err)
    {
        if (err) return cb(err);
        cb();
    });
};