var request = require('request'),
    fs      = require('fs'),
    path    = require('path'),
    _ = require('../../lib/util');

var DOWNLOAD_URL_PREFIX = 'https://raw.githubusercontent.com/liriliri/eris/master/';

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
            var downloadPath = path.resolve(options.cwd, 'eustia/' + repo + '.js');

            repoNames.push(repo);

            var src = DOWNLOAD_URL_PREFIX + repo[0].toLowerCase() + '/' + repo + '.js';

            request.get(src)
                .on('response', function (res)
                {
                    var status = res.statusCode;

                    if (status < 200 || status >= 300)
                    {
                        return cb('Error downloading ' + repo + ': ' + status);
                    }
                })
                .pipe(fs.createWriteStream(downloadPath))
                .on('close', function ()
                {
                    _.log.ok(repo + ' installed.');
                    if (++i === len) cb();
                })
                .on('error', function (err) { cb(err) });
        });

        _.log('Installing ' + repoNames.join(', ') + '.');
    });
};