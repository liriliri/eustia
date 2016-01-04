var genCode = require('./genCode'),
    async   = require('async'),
    _ = require('../util');

module.exports = function (fnList, codeTpl, options, cb)
{
    _.log('Generate codes:');

    var codes  = [],
        fnMark = {},
        i, len;

    var walker = async.queue(function (fnName, walkerCb)
    {
        genCode(fnName, codeTpl, options, function (err, result)
        {
            if (err) return cb(err);

            var dependencies = result.dependencies,
                dependency, i, len;

            for (i = 0, len = dependencies.length; i < len; i++)
            {
                dependency = dependencies[i];
                if (fnMark.hasOwnProperty(dependency)) continue;

                fnMark[dependency] = true;
                walker.push(dependency);
            }

            codes.push(result);
            walkerCb();
        });
    }, 50);

    for (i = 0, len = fnList.length; i < len; i++)
    {
        if (fnMark.hasOwnProperty(fnList[i])) continue;
        fnMark[fnList[i]] = true;
        walker.push(fnList[i]);
    }

    if (len === 0) cb(null, codes);

    walker.drain = function () { cb(null, codes) }
};