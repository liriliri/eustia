var _ = require('../../lib/util');

module.exports = function (repoData, options, cb)
{
    _.log('Searching "' + options.keyword + '":');

    var foundMods = [],
        keyword = options.keyword;

    _.each(repoData, function (repo, key)
    {
        if (repo.toLowerCase().indexOf(keyword) > -1)
        {
            foundMods.push({
                name: key,
                desc: repo
            });
        }
    });

    cb(null, foundMods);
};