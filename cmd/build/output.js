var fs   = require('fs'),
    path = require('path'),
    _ = require('../../lib/util');

module.exports = function (codes, codesTpl, formatTpl, options, cb)
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
        // The first one is just a empty string, need to exclude it.
        codesOrder.shift();
    } catch(e)
    {
        _.log.err(e.message);
    }

    _.log({}, 'Modules generated: {{#cyan}}' + JSON.stringify(codesOrder) + '{{/cyan}}');

    for (var i = 0, len = codesOrder.length; i < len; i++)
    {
        code += codesMap[codesOrder[i]];
        if (i !== len - 1) code += '\n\n';
    }

    var codesData = {
        code: code,
        namespace: options.namespace,
        inBrowser: options.format === 'umd' || options.format === 'global'
    };

    var excludeRef = options.shareData.excludeRef;
    if (excludeRef.length > 0)
    {
        excludeRef = excludeRef.sort();
        codesData.excludeRef = _.unique(excludeRef);
    }

    var result = codesTpl(codesData).replace(/\r\n|\n/g, '\n    ');

    result = result.replace(/\n\s*\n/g, '\n\n');

    result = options.magicNum + '\n' +
             formatTpl({
                 namespace: options.namespace,
                 codes: result
             });

    _.log({}, 'Output file: {{#cyan}}' + options.output + '{{/cyan}}');

    fs.writeFile(options.output, result, options.encoding, function (err)
    {
        if (err) return cb(err);
        cb();
    });
};
