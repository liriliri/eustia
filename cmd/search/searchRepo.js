var util = require('../../lib/util'),
    logger = require('../../lib/logger');

module.exports = function (repoData, options, cb)
{
    logger.log('Searching "' + options.keyword + '":');

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