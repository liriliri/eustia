var inquirer = require('inquirer'),
    async    = require('async'),
    _ = require('../../lib/util');

module.exports = function (repoData, options, cb)
{
    var foundModules = {},
        ret = [],
        installModules = options.modules;

    function checkModule(mod, name)
    {
        return function (cb)
        {
            if (mod.length === 0)
            {
                _.log.warn('Not found: ' + name);
                return cb();
            }

            if (mod.length === 1)
            {
                ret.push(mod[0]);
                return cb();
            }

            var choices = _.map(mod, function (val)
            {
                return { name: val.name + ': ' + val.desc, value: val }
            });

            inquirer.prompt([{
                name: name,
                type: 'list',
                message: 'Found ' + mod.length + ' "' + name +'", which one do you want to install',
                choices: choices
            }], function (answer)
            {
                ret.push(answer);
                cb();
            });
        }
    }

    _.each(installModules, function (mod)
    {
        var matchRepos = [];

        _.each(repoData, function (repo)
        {
            if (repo.name === mod) matchRepos.push(repo);
        });

        foundModules[mod] = matchRepos;
    });

    var callbacks = [];

    _.each(foundModules, function (mod, name)
    {
        callbacks.push(checkModule(mod, name));
    });

    async.waterfall(callbacks, function (err)
    {
        if (err) return cb(err);

        cb(null, ret);
    });
};