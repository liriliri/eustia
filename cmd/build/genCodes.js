var genCode = require('./genCode'),
    async   = require('async'),
    _ = require('../../lib/util');

module.exports = function (fnList, codeTpl, options, cb)
{
    _.log('Generate codes:');

    var codes  = [],
        modMark = {},
        i, len;

    var excludeRef = options.data.excludeRef = [];

    var walker = async.queue(function (modName, walkerCb)
    {
        genCode(modName, codeTpl, options, function (err, result)
        {
            if (err) return cb(err);

            var dependencies = result.dependencies,
                newDependencies = [],
                dependency, i, len;

            for (i = 0, len = dependencies.length; i < len; i++)
            {
                dependency = dependencies[i];

                if (_.contain(options.exclude, dependency))
                {
                    excludeRef.push(dependency);
                    continue;
                }

                newDependencies.push(dependency);

                if (modMark.hasOwnProperty(dependency)) continue;

                modMark[dependency] = true;

                walker.push(dependency);
            }

            result.dependencies = newDependencies;

            codes.push(result);
            walkerCb();
        });
    }, 50);

    for (i = 0, len = fnList.length; i < len; i++)
    {
        modMark[fnList[i]] = true;
        walker.push(fnList[i]);
    }

    if (len === 0) cb(null, codes);

    walker.drain = function () { cb(null, codes) }
};