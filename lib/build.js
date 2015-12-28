var path  = require('path'),
    async = require('async'),
    readTpl  = require('./build/readTpl'),
    scanSrc  = require('./build/scanSrc'),
    genCodes = require('./build/genCodes'),
    output   = require('./build/output'),
    _ = require('./util');

function exports(options, cb)
{
    var startTime = _.now();

    ['library', 'include', 'exclude', 'ignore', 'files'].forEach(function (val)
    {
        if (!_.isArr(options[val])) options[val] = [options[val]];
    });

    // If files are empty, scan html and js files in current working directory.
    if (options.files.length === 0 && options.include.length === 0)
    {
        options.files = ['./*.html', './*.js'];
    }

    _.each(options.files, function (val, idx)
    {
        options.files[idx] = path.resolve(options.cwd, val);
    });

    options.output = path.resolve(options.cwd, options.output);

    var libPaths = [];
    libPaths.push(path.resolve(options.cwd, 'eustia'));
    _.each(options.library, function (library) { libPaths.push(path.resolve(library)) });
    libPaths.push(path.resolve(__dirname, '../src'));

    options.libPaths = libPaths;

    var templates;

    async.waterfall([
        function (cb) { readTpl(options, cb) },
        function (tpl, cb) { templates = tpl; cb() },
        function (cb) { scanSrc(options, cb) },
        function (fnList, cb) { genCodes(fnList, templates['code'], options, cb) },
        function (codes, cb)
        {
            output(codes, templates['codes'], templates[options.pattern], options, cb)
        }
    ], function (err)
    {
        if (err) _.log.err(err);

        _.log.ok('Done, cost ' + (_.now() - startTime) + 'ms.');

        cb && cb();
    });
}

exports.defOpts = {
    encoding : 'utf-8',
    namespace: '_',
    pattern  : 'umd',
    output   : './util.js',
    files    : [],
    ignore   : [],
    library  : [],
    include  : [],
    exclude  : []
};

module.exports = exports;