var file       = require('./file'),
    fs         = require('fs'),
    path       = require('path'),
    async      = require('async'),
    handlebars = require('handlebars'),
    logger     = require('./logger');

var exports = {};

var options = {};

var codeTpl, resultTpl;

function readTpl(callback)
{
    logger('Reading templates...');

    async.parallel([
        function (callback)
        {
            var tplPath = path.resolve(options.dirname, './template/code.hbs');

            fs.readFile(tplPath, 'utf-8', function (err, data)
            {
                if (err) return callback(err);

                codeTpl = handlebars.compile(data, {noEscape: true});
                callback();
            });
        },
        function (callback)
        {
            var tplPath = path.resolve(options.dirname, './template/result.hbs');

            fs.readFile(tplPath, 'utf-8', function (err, data)
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

var regMethod = /\b_\.\w+\b/g;

function scanSrc(callback)
{
    logger('Scanning source code...');

    var files = options.files;

    var funcList = [], i, len;

    file.readPaths(files, function (err, files)
    {
        if (err) return callback(err);

        for (i = 0, len = files.length; i < len; i++)
        {
            var methods = files[i].match(regMethod);
            if (!methods) continue;

            funcList = funcList.concat(methods);
        }

        for (i = 0, len = funcList.length; i < len; i++)
        {
            funcList[i] = funcList[i].substr(2);
        }

        callback(null, funcList);
    });
}

function genCodes(funcList, callback)
{
    logger('Generating codes...');

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
        walker.push(funcList[i]);
        funcMark[funcList[i]] = true;
    }

    if (len === 0) callback(null, codes);

    walker.drain = function () { callback(null, codes) }
}

var regDependency = /\s*['"][\w\s]+['"];/;

function genCode(funcName, callback)
{
    logger('Generating code ' + funcName + '...');

    var result = {};

    async.detect([
        path.resolve(options.dirname, 'src/' + funcName + '.js'),
        path.resolve(options.cwd, 'eustia/' + funcName + '.js')
    ], fs.exists, function (path)
    {
        fs.readFile(path, 'utf-8', function (err, data)
        {
            if (err) return callback(err);

            data = stripComments(data);

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
                params += dependencies[i];
                if (i !== len - 1)
                {
                    depStr += ', ';
                    params += ', ';
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
    logger('Outputting result...');

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
        methodList: methodList
    });

    result = result.replace(/\n\s*\n/g, '\n\n');

    if (options.out)
    {
        var outPath = process.cwd() + '/' + options.out;

        fs.writeFile(outPath, result, 'utf-8', function (err)
        {
            if (err) return callback(err);
            callback();
        });
    } else
    {
        logger(result);
        callback();
    }
}

var regStripComments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

function stripComments(str)
{
    return str.replace(regStripComments, '');
}

exports.exec = function (opts)
{
    logger('Executing...');

    options = opts;
    async.waterfall([
        readTpl,
        scanSrc,
        genCodes,
        output
    ], function (err)
    {
        if (err) logger.error(err);

        logger('Done!');
    });
};

module.exports = exports;