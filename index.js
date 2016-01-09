var path = require('path'),
    fs   = require('fs'),
    _ = require('./lib/util');

var defOpts = {
    cwd: process.cwd(),
    // Prepend to generated file to prevent being scanned again.
    magicNum : '// Built by eustia.',
    shareData: {},
    encoding : 'utf-8',
    packInfo : require('./package.json')
};

var errLogPath = path.resolve(process.cwd(), './eustia-debug.log'),
    commands = ['build', 'docs', 'search', 'install', 'help', 'version'];

_.each(commands, function (name)
{
    var cmd = require('./lib/' + name);

    exports[name] = function (options, cb)
    {
        cb = cb || _.noop;

        cmd(_.defaults(options, defOpts, cmd.defOpts), function (err)
        {
            if (err)
            {
                _.log.err(err);
                fs.writeFileSync(errLogPath, _.log.get().join('\n'), 'utf-8');
                process.exit();
            }

            fs.exists(errLogPath, function (result) { if (result) fs.unlink(errLogPath) });

            cb();
        });
    };
});

