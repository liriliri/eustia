var path  = require('path'),
    _ = require('../../lib/util');

var regCommonjs = /require\(.*\)/,
    regEs6 = /import.*from/;

function extractMethod(options, file)
{
    var ret;

    if (regCommonjs.test(file.data))
    {
        ret = extractCommonjs(options, file);
    } else if (regEs6.test(file.data))
    {
        ret = extractEs6(options, file);
    } else
    {
        ret = extractGlobal(options.namespace, file);
    }

    return _.unique(ret);
}

function extractGlobal(namespace, file)
{
    var methods = file.data.match(new RegExp('\\b' + namespace + '\\.[\\$\\w]+', 'g'));

    return methods ? _.map(methods, function (val) { return val.substr(namespace.length + 1) }) : [];
}

function extractCommonjs(options, file)
{
    var requirePath = relativePath(file.path, options.output),
        regRequire  = new RegExp('(\\w+)\\s*=\\s*require\\([\'"]' + requirePath + '(?:\\.js)?[\'"]\\)'),
        namespace   = file.data.match(regRequire);

    if (namespace) namespace = namespace[1];

    return extractGlobal(namespace ? namespace : options.namespace, file);
}

function relativePath(from, to)
{
    var ret = path.relative(path.dirname(from), to)
                  .replace(/\\/g, '/')
                  .replace(/\.js$/, '')
                  .replace(/\./g, '\\.');

    if (!_.startWith(ret, '\\.')) ret = '\\./' + ret;

    return ret;
}

function extractEs6(options, file)
{
    var requirePath = relativePath(file.path, options.output),
        regImport = new RegExp('import\\s+(\\w+)\\s+from\\s*[\'"]' + requirePath + '[\'"]'),
        namespace = file.data.match(regImport);

    if (namespace)
    {
        namespace = namespace[1];
        return extractGlobal(namespace, file);
    }

    var regImportMembers = new RegExp('import\\s*\{([\\w,\\s]+)\}\\s*from\\s*[\'"]' + requirePath + '[\'"]'),
        methods = file.data.match(regImportMembers);

    if (methods) return methods[1].split(',');

    return extractGlobal(options.namespace, file);
}

function getFnPercentage(fnList, filesNum)
{
    var ret = {};

    _.each(fnList, function (fnName)
    {
        ret[fnName] = ret[fnName] !== undefined ? ret[fnName] + 1 : 1;
    });

    _.each(ret, function (val, key)
    {
        ret[key] = (val / filesNum * 100).toFixed(2) + '%';
    });

    return ret;
}

module.exports = function (options, cb)
{
    if (options.files.length === 0)
    {
        _.log('File list is empty, use include option only.');
        _.log({}, 'Modules found: {{#cyan}}' + JSON.stringify(options.include) + '{{/cyan}}');
        options.shareData.fnPercentage = {};
        return cb(null, options.include);
    }

    _.log('Scan source code: ');
    _.log.color(options.files.join('\n'), 'cyan');

    var files  = options.files,
        fnList = options.include,
        i, len;

    _.readPaths(files, options, function (err, files)
    {
        if (err) return cb(err);

        for (i = 0, len = files.length; i < len; i++)
        {
            var file = files[i];

            if (_.startWith(file.data, options.magicNum)) continue;

            file.data = _.stripCmts(file.data);

            fnList = fnList.concat(extractMethod(options, file));
        }

        fnList = _.map(fnList, function (fnName) { return _.trim(fnName) });

        options.shareData.fnPercentage = getFnPercentage(fnList, files.length);

        fnList = _.filter(_.unique(fnList), function (fnName)
        {
            return !_.contain(options.exclude, fnName);
        });

        _.log({}, 'Modules found: {{#cyan}}' + JSON.stringify(fnList) + '{{/cyan}}');

        cb(null, fnList);
    });
};
