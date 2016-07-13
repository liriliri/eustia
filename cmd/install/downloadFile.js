var fs = require('fs'),
    path = require('path');

var downloadMod = require('../../lib/downloadMod'),
    logger = require('../../lib/logger'),
    util = require('../../lib/util');

module.exports = function (installRepos, options, cb)
{
    var len = installRepos.length,
        repoNames = [],
        i = 0;

    if (len === 0) return;

    fs.mkdir(path.resolve(options.cwd, 'eustia/'), function ()
    {
        util.each(installRepos, function (repo)
        {
            var downloadDest = path.resolve(options.cwd, 'eustia/' + repo + '.js');

            repoNames.push(repo);

            downloadMod(repo, downloadDest, function (err)
            {
                if (err) return cb(err);

                logger.info(repo + ' installed.');

                if (++i === len) cb();
            });
        });

        logger.info('Install ' + repoNames.join(', ') + '.');
    });
};