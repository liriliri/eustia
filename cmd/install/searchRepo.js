var util = require('../../lib/util'),
    logger = require('../../lib/logger');

module.exports = function (options, cb)
{
    var repoData = require('../share/eris.json');

    var ret = [],
        installMods = options.modules;

    util.each(installMods, function (mod)
    {
        var repo = repoData[mod];

        if (repo)
        {
            ret.push(mod);
            return;
        }

        logger.warn('Not found: ' + mod);
    });

    cb(null, ret);
};