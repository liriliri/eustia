var util = require('../../lib/util');

module.exports = function (repoData, options, cb)
{
    var foundMods = [],
        keyword = options.keyword;

    util.each(repoData, function (repo, key)
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