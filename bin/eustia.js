#!/usr/bin/env node

var nopt = require('nopt'),
    path = require('path'),
    fs = require('fs'),
    chokidar = require('chokidar');

var eustia = require('../index'),
    logger = require('../lib/logger'),
    util = require('../lib/util');

var knowOpts = {
        encoding: String,
        extension: Array,
        output: String,
        update: Boolean,
        namespace: String,
        ignore: Array,
        keyword: String,
        library: Array,
        exclude: Array,
        include: Array,
        format: String,
        title: String,
        config: String,
        watch: Boolean,
        verbose: Boolean,
        help: Boolean,
        strict: Boolean,
        version: Boolean,
        description: String,
        proxy: String
    },
    shortHands = {
        o: '--output',
        i: '--include',
        k: '--keyword',
        l: '--library',
        e: '--exclude',
        n: '--namespace',
        f: '--format',
        s: '--strict',
        t: '--title',
        w: '--watch',
        u: '--update',
        c: '--config',
        h: '--help',
        v: '--version',
        d: '--description'
    },
    options = nopt(knowOpts, shortHands, process.argv, 2),
    remain = options.argv.remain;

logger.enable();
options.enableLog = true;
options.errLog = true;

var cmd = getCmd();
cmd ? useCmdLine() : useCfg();

function getCmd() {
    var i, len, ret;

    for (i = 0, len = remain.length; i < len; i++) {
        if (util.has(eustia, remain[i])) {
            ret = remain[i];
            remain.splice(i, 1);
            break;
        }
    }

    if (!ret) {
        if (options.help) {
            ret = 'help';
        } else if (options.version) {
            ret = 'version';
        }
    }

    return ret;
}

function useCfg() {
    var cfgPath = path.resolve(process.cwd(), options.config || '.eustia'),
        configs;

    fs.exists(cfgPath, function(exists) {
        if (exists) {
            logger.tpl(
                { data: cfgPath },
                'CONFIGURATION FILE {{#cyan}}{{{data}}}{{/cyan}}'
            );

            return fs.readFile(cfgPath, 'utf8', function(err, data) {
                try {
                    configs = JSON.parse(data);
                } catch (e) {
                    configs = require(cfgPath);
                }

                build(configs);
            });
        }

        try {
            var pkgInfo = require(path.resolve(process.cwd(), 'package.json'));
            if (pkgInfo.eustia) {
                logger.tpl(
                    { data: 'package.json' },
                    'CONFIGURATION FILE {{#cyan}}{{{data}}}{{/cyan}}'
                );
                build(pkgInfo.eustia);
            } else {
                eustia.help(options);
            }
        } catch (e) {
            eustia.help(options);
        }
    });
}

function useCmdLine() {
    var hasRemain = !util.isEmpty(remain);

    switch (cmd) {
        case 'build':
            options.files = remain;
            break;
        case 'search':
            if (hasRemain) options.keyword = remain[0];
            break;
        case 'help':
            if (hasRemain) options.command = remain[0];
            break;
        case 'doc':
            if (hasRemain) options.input = remain[0];
            break;
        case 'install':
            options.modules = remain;
            break;
        case 'cache':
            if (hasRemain) options.subCmd = remain[0];
            break;
    }

    eustia[cmd](options);
}

function build(configs) {
    var isSingle = util.some(configs, function(option) {
        return !util.isPlainObj(option);
    });
    if (isSingle) {
        util.extend(configs, options);
        return eustia.build(configs);
    }

    buildAll(configs);
}

function buildAll(configs) {
    var isTaskSpecified = remain.length > 0 && configs[remain[0]];

    if (isTaskSpecified) {
        logger.tpl({}, 'Run task {{#cyan}}"' + remain[0] + '"{{/cyan}}:');

        return eustia['build'](util.extend(configs[remain[0]], options));
    }

    var cfgArr = [],
        watch = options.watch;
    options.watch = false;

    util.each(configs, function(val, key) {
        val.taskName = key;
        cfgArr.push(val);
        configs[key] = util.extend(val, options);
    });

    var cfgLen = cfgArr.length,
        i = 0;

    function build(config, isWatching) {
        logger.tpl({}, 'Run task {{#cyan}}"' + config.taskName + '"{{/cyan}}:');

        eustia.build(config, function() {
            if (++i < cfgLen) return build(cfgArr[i], isWatching);

            if (!isWatching && watch) beginWatch();
        });
    }
    build(cfgArr[i]);

    /* Watching files with multiple tasks, the log will be mixed together.
     * That's why we need to extract another watch code here.
     */
    function beginWatch() {
        var watchPaths = [],
            outputs = [];

        util.each(cfgArr, function(config) {
            outputs = outputs.concat(config.output);
            watchPaths = watchPaths.concat(config.files);
            watchPaths = watchPaths.concat(config.libPaths);
        });

        chokidar
            .watch(watchPaths, {
                persistent: true,
                ignored: outputs,
                ignoreInitial: true,
                followSymlinks: true,
                usePolling: true,
                alwaysStat: false,
                interval: 100,
                atomic: true,
                ignorePermissionErrors: false
            })
            .on('change', function() {
                i = 0;
                build(cfgArr[i], true);
            });
    }
}
