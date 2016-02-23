var path = require('path'),
    fs = require('fs'),
    _ = require('./lib/util');

var cwd = process.cwd();

var defOpts = {
    cwd: cwd,
    // Prepend to generated file to prevent being scanned again.
    magicNum: '// Built by eustia.',
    shareData: {},
    enableLog: false,
    encoding: 'utf-8',
    packInfo: require('./package.json')
};

var errLogPath = path.resolve(cwd, './eustia-debug.log');

function cmdFactory(cmdName)
{
    var cmd = require('./cmd/' + cmdName);

    return function (options, cb)
    {
        cb = cb || _.noop;
        options = _.defaults(options, defOpts, cmd.defOpts);

        if (options.enableLog) _.log.enable();

        cmd(options, function (err)
        {
            if (err)
            {
                _.log.err(err);
                var errLogs = _.stripColorCodes(_.log.get().join('\n'));
                // Need to exit immediately, so async fs is not used.
                fs.writeFileSync(errLogPath, errLogs, 'utf-8');
                process.exit();
            }

            fs.exists(errLogPath, function (result)
            {
                if (result) fs.unlink(errLogPath);
            });

            cb();
        });
    };
}

module.exports = {
    build: cmdFactory('build'),
    docs: cmdFactory('docs'),
    search: cmdFactory('search'),
    install: cmdFactory('install'),
    help: cmdFactory('help'),
    version: cmdFactory('version')
};