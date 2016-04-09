var fs = require('fs'),
    path = require('path'),
    downloadMod = require('../share/downloadMod'),
    _ = require('../../lib/util');

module.exports = function (installRepos, options, cb)
{
    var len = installRepos.length,
        repoNames = [],
        i = 0;

    if (len === 0) return;

    fs.mkdir(path.resolve(options.cwd, 'eustia/'), function ()
    {
        _.each(installRepos, function (repo)
        {
            var downloadDest = path.resolve(options.cwd, 'eustia/' + repo + '.js');

            repoNames.push(repo);

            downloadMod(repo, downloadDest, function (err)
            {
                if (err) return cb(err);

                _.log.ok(repo + ' installed.');

                if (++i === len) cb();
            });
        });

        _.log('Install ' + repoNames.join(', ') + '.');
    });
};