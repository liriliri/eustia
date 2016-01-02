var _ = require('./lib/util');

var defOpts = {
    cwd: process.cwd(),
    // Prepend to generated file to prevent being scanned again.
    magicNum : '// Built by eustia.',
    shareData: {},
    packInfo : require('./package.json')
};

['build', 'help', 'version'].forEach(function (name)
{
    var cmd = require('./lib/' + name);

    exports[name] = function (options, cb)
    {
        cmd(_.defaults(options, defOpts, cmd.defOpts), cb);
    };
});

