#!/usr/bin/env node

var nopt = require('nopt'),
    path = require('path'),
    fs = require('fs'),
    chokidar = require('chokidar'),
    eustia = require('../index'),
    _ = require('../lib/util');

var knowOpts = {
        encoding : String,
        extension: Array,
        output   : String,
        namespace: String,
        ignore   : Array,
        keyword  : String,
        library  : Array,
        exclude  : Array,
        include  : Array,
        pattern  : String,
        raw      : Boolean,
        title    : String,
        type     : String,
        watch    : Boolean,
        description: String
    },
    shortHands = {
        o: '--output',
        i: '--include',
        k: '--keyword',
        l: '--library',
        e: '--exclude',
        n: '--namespace',
        p: '--pattern',
        t: '--title',
        w: '--watch',
        d: '--description'
    },
    options = nopt(knowOpts, shortHands, process.argv, 2),
    remain  = options.argv.remain,
    cmd, i, len;

options.enableLog = true;

for (i = 0, len = remain.length; i < len; i++)
{
    if (_.has(eustia, remain[i]))
    {
        cmd = remain[i];
        remain.splice(i, 1);
        break;
    }
}

if (!cmd)
{
    var cfgPath = path.resolve(process.cwd(), '.eustia');

    fs.exists(cfgPath, function (exists)
    {
        if (exists)
        {
            _.log.ok('Using configuration file: ' + cfgPath);

            fs.readFile(cfgPath, 'utf-8', function (err, data)
            {
                var options;

                try {
                    options = JSON.parse(data);
                } catch (e)
                {
                    options = require(cfgPath);
                }

                buildAll(options);
            });
        } else eustia['help'](options);
    });
} else
{
    switch (cmd)
    {
        case 'build': options.files = remain; break;
        case 'search': {
            if (remain.length > 0) options.keyword = remain[0];
            break;
        }
        case 'help': {
            if (remain.length > 0) options.command = remain[0];
            break;
        }
        case 'docs': {
            if (remain.length > 0) options.input = remain[0];
            break;
        }
        case 'install': options.modules = remain; break;
    }

    eustia[cmd](options);
}

function buildAll(configs)
{
    if (remain.length > 0 && configs[remain[0]])
    {
        return eustia['build'](_.extend(configs[remain[0]], options));
    }

    var cfgArr = [],
        watch = options.watch;
    options.watch = false;

    _.each(configs, function (val, key)
    {
        val.taskName = key;
        cfgArr.push(val);
        configs[key] = _.extend(val, options);
    });

    var cfgLen = cfgArr.length, i = 0;

    function build(config, isWatching)
    {
        _.log('Run task "' + config.taskName + '":');

        eustia['build'](config, function ()
        {
            if (++i < cfgLen) return build(cfgArr[i], isWatching);

            if (!isWatching && watch) beginWatch();
        });
    }
    build(cfgArr[i]);

    /* Watching files with multiple tasks, the log will be mixed together.
     * That's why we need to extract another watch code here.
     */
    function beginWatch()
    {
        var watchPaths = [], outputs = [];

        _.each(cfgArr, function (config)
        {
            outputs = outputs.concat(config.output);
            watchPaths = watchPaths.concat(config.files);
            watchPaths = watchPaths.concat(config.libPaths);
        });

        chokidar.watch(watchPaths, {
            persistent    : true,
            ignored       : outputs,
            ignoreInitial : true,
            followSymlinks: true,
            usePolling    : true,
            alwaysStat    : false,
            interval      : 100,
            atomic        : true,
            ignorePermissionErrors: false
        }).on('change', function ()
        {
            i = 0;
            build(cfgArr[i], true);
        });
    }
}
