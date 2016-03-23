var _ = require('../../lib/util');

module.exports = function (options, cb)
{
    var repoData = require('../share/eris.json');

    var ret = [],
        installMods = options.modules;

    _.each(installMods, function (mod)
    {
        var repo = repoData[mod];

        if (repo)
        {
            repo.name = mod;
            ret.push(repo);
            return;
        }

        _.log.warn('Not found: ' + mod);
    });

    cb(null, ret);
};