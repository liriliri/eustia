var path = require('path'),
    async = require('async'),
    chokidar = require('chokidar'),
    qs = require('qs'),
    readTpl = require('./share/readTpl'),
    scanSrc = require('./build/scanSrc'),
    genCodes = require('./build/genCodes'),
    output = require('./build/output'),
    _ = require('./util');

function exports(options, cb)
{
    cb = cb || _.noop;

    transArrOptions(options);
    transTranspilerOption(options, cb);
    handleEmptyFiles(options);
    resolvePaths(options);

    var templates;

    function build(isWatching)
    {
        options.shareData = {};

        var startTime = _.now();

        async.waterfall([
            function (cb) { readTpl(['code', 'codes', options.pattern], options, cb) },
            function (tpl, cb) { templates = tpl; cb() },
            function (cb) { scanSrc(options, cb) },
            function (fnList, cb) { genCodes(fnList, templates['code'], options, cb) },
            function (codes, cb)
            {
                output(codes, templates['codes'], templates[options.pattern], options, cb)
            }
        ], function (err)
        {
            if (err)
            {
                if (isWatching) return _.log.err(err);
                return cb(err);
            }

            _.log.ok('Done, cost ' + (_.now() - startTime) + 'ms.');

            cb();
        });
    }
    build();

    if (options.watch)
    {
        var watchPaths = options.files.concat(options.libPaths);

        chokidar.watch(watchPaths, {
            persistent    : true,
            ignored       : options.output,
            ignoreInitial : true,
            followSymlinks: true,
            usePolling    : true,
            alwaysStat    : false,
            interval      : 100,
            atomic        : true,
            ignorePermissionErrors: false
        }).on('change', function () { build(true) });
    }
}

exports.defOpts = {
    namespace: '_',
    pattern: 'umd',
    output: './util.js',
    extension: 'js',
    transpiler: [],
    files: [],
    ignore: [],
    library: [],
    include: [],
    exclude: [],
    watch: false
};

function transArrOptions(options)
{
    ['library', 'include', 'exclude', 'ignore', 'files',
     'extension', 'transpiler'].forEach(function (val)
    {
        if (!_.isArr(options[val])) options[val] = [options[val]];
    });
}

function transTranspilerOption(options, cb)
{
    var cwd = options.cwd;

    _.each(options.transpiler, function (transpiler)
    {
        if (!_.isArr(transpiler.handler)) transpiler.handler = [transpiler.handler];

        var handlers = transpiler.handler;

        _.each(handlers, function (handler, idx)
        {
            if (_.isStr(handler))
            {
                handler = handler.split('?');
                var handlerName = handler[0],
                    options = {};

                if (handler[1]) options = qs.parse(handler[1]);
                try
                {
                    var requirePath = path.resolve(cwd, 'node_modules/eustia-' + handlerName);
                    handlers[idx] = require(requirePath)(options);
                } catch (e)
                {
                    cb(e);
                }
            }
        });
    });
}

function handleEmptyFiles(options)
{
    // If files are empty, scan html and js files in current working directory.
    if (options.files.length === 0 && options.include.length === 0)
    {
        options.files = ['./*.html', './*.js'];
    }
}

function resolvePaths(options)
{
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

    _.log('Library paths:');
    _.log.color(libPaths.join('\n'), 'cyan');
}

module.exports = exports;
