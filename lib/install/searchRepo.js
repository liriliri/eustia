var inquirer = require('inquirer'),
    async    = require('async'),
    _ = require('../util');

module.exports = function (repoData, options, cb)
{
    var foundUtils = {},
        ret = [],
        installUtils = options.utils;

    function checkUtil(util, name)
    {
        return function (cb)
        {
            if (util.length === 0)
            {
                _.log.warn('Not found: ' + name);
                return cb();
            }

            if (util.length === 1)
            {
                ret.push(util[0]);
                return cb();
            }

            var choices = _.map(util, function (val)
            {
                return { name: val.name + ': ' + val.desc, value: val }
            });

            inquirer.prompt([{
                name: name,
                type: 'list',
                message: 'Found ' + util.length + ' "' + name +'", which one do you want to install',
                choices: choices
            }], function (answer)
            {
                ret.push(answer);
                cb();
            });
        }
    }

    _.each(installUtils, function (utility)
    {
        var matchRepos = [];

        _.each(repoData, function (repo)
        {
            if (repo.name === utility) matchRepos.push(repo);
        });

        foundUtils[utility] = matchRepos;
    });

    var callbacks = [];

    _.each(foundUtils, function (utility, name)
    {
        callbacks.push(checkUtil(utility, name));
    });

    async.waterfall(callbacks, function (err)
    {
        if (err) return cb(err);

        cb(null, ret);
    });
};