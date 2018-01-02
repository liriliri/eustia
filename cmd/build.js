var path = require('path'),
    async = require('async'),
    chokidar = require('chokidar'),
    qs = require('qs');

var readTpl = require('./share/readTpl'),
    scanSrc = require('./build/scanSrc'),
    buildMods = require('./build/buildMods'),
    output = require('./build/output'),
    logger = require('../lib/logger'),
    util = require('../lib/util');

function exports(options, cb)
{
    transArrOpts(options);
    transTranspilerOpt(options, cb);
    handleEmptyFiles(options);
    resolvePaths(options);

    var templates;

    build(options.watch);

    if (options.watch)
    {
        var watchPaths = options.files.concat(options.libPaths);

        chokidar.watch(watchPaths, {
            persistent: true,
            ignored: options.output,
            ignoreInitial: true,
            followSymlinks: true,
            usePolling: true,
            alwaysStat: false,
            interval: 100,
            atomic: true,
            ignorePermissionErrors: false
        }).on('change', function ()
        {
            build(true);
        });
    }

    function build(isWatching)
    {
        options.data = {};

        var startTime = util.now();

        async.waterfall([
            function (cb)
            {
                var tplList = ['code', 'codes'];

                var format = options.format;
                if (format !== 'commonjs' && format !== 'es') tplList.push(format);

                readTpl(tplList, cb);
            },
            function (tpl, cb)
            {
                templates = tpl;
                cb();
            },
            function (cb)
            {
                scanSrc(options, cb);
            },
            function (fnList, cb)
            {
                buildMods(fnList, templates['code'], options, cb);
            },
            function (codes, cb)
            {
                output(codes, templates['codes'], templates[options.format], options, cb)
            }
        ], function (err)
        {
            if (err)
            {
                if (isWatching) return logger.error(err);
                return cb(err);
            }

            logger.info('TIME COST ' + (util.now() - startTime) + 'ms.');

            cb();
        });
    }
}

exports.defOpts = {
    namespace: '_',
    format: 'umd',
    output: './util' + '.js', // Split it to avoid being scanned.
    extension: 'js',
    strict: true,
    transpiler: [],
    files: [],
    ignore: [],
    library: [],
    include: [],
    exclude: [],
    watch: false
};

function transArrOpts(options)
{
    var ARR_OPTIONS = [
        'library', 'include', 'exclude', 'ignore',
        'files', 'extension', 'transpiler'
    ];
    ARR_OPTIONS.forEach(function (key)
    {
        options[key] = util.toArr(options[key]);
    });
}

function transTranspilerOpt(options, cb)
{
    var cwd = options.cwd;

    options.transpiler.forEach(function (transpiler)
    {
        transpiler.handler = util.toArr(transpiler.handler);

        var handlers = transpiler.handler;

        util.each(handlers, function (handler, idx)
        {
            if (util.isStr(handler))
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
    if (util.isEmpty(options.files) && util.isEmpty(options.include))
    {
        options.files = ['./*.html', './*.js'];
    }
}

function resolvePaths(options)
{
    options.files = options.files.map(function (val)
    {
        return path.resolve(options.cwd, val);
    });

    options.output = path.resolve(options.cwd, options.output);

    var libPaths = [];
    libPaths.push(path.resolve(options.cwd, 'eustia'));
    options.library.forEach(function (library)
    {
        libPaths.push(path.resolve(library));
    });
    libPaths.push(path.resolve(__dirname, '../cache'));

    options.libPaths = libPaths;

    logger.log('LIBRARY PATHS');
    logger.color(libPaths.join('\n'), 'cyan');
}

module.exports = exports;
