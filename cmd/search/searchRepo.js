var _ = require('../../lib/util');

module.exports = function (repoData, options, cb)
{
    var foundUtils = [],
        keyword = options.keyword;

    _.each(repoData, function (repo)
    {
        if (repo.name.indexOf(keyword) > -1 ||
            repo.keywords.indexOf(keyword) > -1 ||
            repo.desc.indexOf(keyword) > -1)
        {
            foundUtils.push(repo);
        }
    });

    cb(null, foundUtils);
};