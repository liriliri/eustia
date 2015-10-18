var fs         = require('fs'),
    path       = require('path'),
    _          = require('./util'),
    async      = require('async'),
    handlebars = require('handlebars');

var options;

var codeTpl, resultTpl;

function readTpl(callback)
{
    _.log('Reading templates...');

    async.parallel([
        function (callback)
        {
            var tplPath = path.resolve(options.dirname, './template/code.hbs');

            fs.readFile(tplPath, options.encoding, function (err, data)
            {
                if (err) return callback(err);

                codeTpl = handlebars.compile(data, {noEscape: true});
                callback();
            });
        },
        function (callback)
        {
            var tplPath = path.resolve(options.dirname, './template/result.hbs');

            fs.readFile(tplPath, options.encoding, function (err, data)
            {
                if (err) return callback(err);

                resultTpl = handlebars.compile(data, {noEscape: true});
                callback();
            });
        }
    ], function (err)
    {
        if (err) return callback(err);

        callback();
    });
}

function scanSrc(callback)
{
    _.log('Scanning source code...');

    var regMethod = new RegExp('\\b' + options.name + '\\.\\w+\\b', 'g');

    var files = options.files;

    var funcList = [];

    _.readPaths(files, options, function (err, files)
    {
        if (err) return callback(err);

        for (var i = 0, len = files.length; i < len; i++)
        {
            var methods = files[i].match(regMethod);
            if (!methods) continue;

            funcList = funcList.concat(methods);
        }

        _.each(funcList, function (val, idx)
        {
            funcList[idx] = val.substr(options.name.length + 1);
        });

        callback(null, funcList);
    });
}

function genCodes(funcList, callback)
{
    _.log('Generating codes...');

    var codes    = [],
        funcMark = {};

    var walker = async.queue(function (funcName, callback)
    {
        genCode(funcName, function (err, result)
        {
            if (err) return callback(err);

            var dependencies = result.dependencies;

            for (var i = 0, len = dependencies.length; i < len; i++)
            {
                var dependency = dependencies[i];
                if (funcMark.hasOwnProperty(dependency)) continue;

                funcMark[dependency] = true;
                walker.push(dependency);
            }

            codes.push(result);
            callback();
        });
    }, 50);

    for (var i = 0, len = funcList.length; i < len; i++)
    {
        if (funcMark.hasOwnProperty(funcList[i])) continue;
        funcMark[funcList[i]] = true;
        walker.push(funcList[i]);
    }

    if (len === 0) callback(null, codes);

    walker.drain = function () { callback(null, codes) }
}

var regDependency = /^\s*['"][\w\s]+['"];/;

function genCode(funcName, callback)
{
    _.log('Generating code ' + funcName + '...');

    var result = {};

    async.detect([
        path.resolve(options.cwd, 'eustia/' + funcName + '.js'),
        path.resolve(options.dirname, 'src/' + funcName + '.js')
    ], fs.exists, function (path)
    {
        if (_.isUndefined(path)) _.log.err('Not found: ' + funcName);
        fs.readFile(path, options.encoding, function (err, data)
        {
            if (err) return callback(err);

            data = _.stripComments(data);

            var dependencies = regDependency.exec(data);
            if (dependencies)
            {
                dependencies = dependencies[0].replace(/^\s|\s$|'|"|;|/g, '')
                                              .split(/\s/);
            } else
            {
                dependencies = [];
            }

            data = data.replace(regDependency, '');
            data = data.replace(/\r\n|\n/g, '\n    ');

            var depStr = '', params = '';

            for (var i = 0, len = dependencies.length; i < len; i++)
            {
                depStr += "'" + dependencies[i] + "'";
                params += dependencies[i] + ', ';
                if (i !== len - 1)
                {
                    depStr += ', ';
                } else
                {
                    params += 's';
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
}

function output(codes, callback)
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
}

function exports(opts)
{
    _.log('Executing...');

    opts.files = opts.argv.remain;

    _.each(opts.files, function (val, idx)
    {
        opts.files[idx] = path.resolve(opts.cwd, val);
    });

    if (opts.exclude) opts.exclude = new RegExp(opts.exclude);

    options = opts;

    async.waterfall([
        readTpl,
        scanSrc,
        genCodes,
        output
    ], function (err)
    {
        if (err) _.log.err(err);

        _.log('Done!');
    });
}

exports.defOpts = {
    encoding: 'utf-8',
    name: '_'
};

module.exports = exports;