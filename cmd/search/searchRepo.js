var _ = require('../../lib/util');

module.exports = function (options, cb)
{
    var repoData = require('../share/eris.json');

    var foundMods = [],
        keyword = options.keyword;

    _.each(repoData, function (repo, key)
    {
        if (key.indexOf(keyword) > -1 ||
            repo.keywords.indexOf(keyword) > -1 ||
            repo.desc.indexOf(keyword) > -1)
        {
            repo.name = key;
            foundMods.push(repo);
        }
    });

    cb(null, foundMods);
};