var _ = require('./lib/util');

var defOpts = {
    cwd     : process.cwd(),
    magicNum: '// Built by eustia.', // Prepend to generated file to prevent being scanned again.
    packInfo: require('./package.json')
};

['build', 'help', 'version'].forEach(function (name)
{
    var cmd = require('./lib/' + name);

    exports[name] = function (options, cb)
    {
        cmd(_.defaults(options, defOpts, cmd.defOpts), cb);
    };
});

