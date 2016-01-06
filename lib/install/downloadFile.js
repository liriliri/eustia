var request = require('request'),
    fs      = require('fs'),
    path    = require('path'),
    _ = require('../util');

module.exports = function (installRepos, options, cb)
{
    var len = installRepos.length,
        repoNames = [],
        i = 0;

    fs.mkdir(path.resolve(options.cwd, 'eustia/'), function ()
    {
        _.each(installRepos, function (repo)
        {
            var downloadPath = path.resolve(options.cwd, 'eustia/' + repo.name + '.js');

            repoNames.push(repo.name);

            request.get(repo.src)
                .on('response', function (res)
                {
                    var status = res.statusCode;

                    if (status < 200 || status >= 300)
                    {
                        return cb('Error downloading ' + repo.name + ': ' + status);
                    }
                })
                .pipe(fs.createWriteStream(downloadPath))
                .on('close', function ()
                {
                    _.log.ok(repo.name + ' installed.');
                    if (++i === len) cb();
                })
                .on('error', function (err) { cb(err) });
        });

        _.log('Installing ' + repoNames.join(', ') + '.');
    });
};