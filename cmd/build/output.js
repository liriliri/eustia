var fs = require('fs');

var util = require('../../lib/util'),
    logger = require('../../lib/logger');

module.exports = function (codes, codesTpl, formatTpl, options, cb)
{
    var code = '',
        dependencyGraph = [],
        allDependencies = [],
        codesMap = {};

    // Sort codes first so that the generated file stays the same
    // when no method is added or removed.
    codes = codes.sort(function (a, b)
    {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

        return 0;
    });

    util.each(codes, function (code)
    {
        var dependencies = code.dependencies;

        dependencyGraph.push(['', code.name]);
        util.each(dependencies, function (dependency)
        {
            dependencyGraph.push([dependency, code.name]);
            allDependencies.push(dependency);
        });

        codesMap[code.name] = code.code
    });

    allDependencies = util.unique(allDependencies);

    try {
        var codesOrder = util.topoSort(dependencyGraph);
        // The first one is just a empty string, need to exclude it.
        codesOrder.shift();
    } catch(e)
    {
        return cb(e);
    }

    for (var i = 0, len = codesOrder.length; i < len; i++)
    {
        var name = codesOrder[i],
            c = codesMap[name];

        if (!util.contain(allDependencies, name))
        {
            c = util.trim(c.replace('var ' + name + ' = ', ''));
        }

        code += c;
        if (i !== len - 1) code += '\n\n';
    }

    var codesData = {
        code: code,
        namespace: options.namespace,
        strict: options.strict,
        inBrowser: options.format === 'umd' || options.format === 'global'
    };

    var excludeRef = options.data.excludeRef;
    if (excludeRef.length > 0)
    {
        excludeRef = excludeRef.sort();
        codesData.excludeRef = util.unique(excludeRef);
    }

    var result = util.indent(codesTpl(codesData));

    result = result.replace(/\n\s*\n/g, '\n\n');

    result = options.magicNum + '\n' +
             formatTpl({
                 namespace: options.namespace,
                 codes: result
             });

    logger.tpl({
        data: codesOrder.sort().join(' ')
    }, 'MODULES GENERATED\n{{#cyan}}{{{data}}}{{/cyan}}');

    logger.tpl({
        output: options.output
    }, 'OUTPUT FILE {{#cyan}}{{{output}}}{{/cyan}}');

    fs.writeFile(options.output, result, options.encoding, function (err)
    {
        if (err) return cb(err);
        cb();
    });
};
