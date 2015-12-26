var genCode = require('./genCode'),
    async   = require('async'),
    _ = require('../util');

module.exports = function (fnList, codeTpl, options, callback)
{
    _.log('Generating codes...');

    var codes  = [],
        fnMark = {};

    var walker = async.queue(function (fnName, callback)
    {
        genCode(fnName, codeTpl, options, function (err, result)
        {
            if (err) return callback(err);

            var dependencies = result.dependencies;

            for (var i = 0, len = dependencies.length; i < len; i++)
            {
                var dependency = dependencies[i];
                if (fnMark.hasOwnProperty(dependency)) continue;

                fnMark[dependency] = true;
                walker.push(dependency);
            }

            codes.push(result);
            callback();
        });
    }, 50);

    for (var i = 0, len = fnList.length; i < len; i++)
    {
        if (fnMark.hasOwnProperty(fnList[i])) continue;
        fnMark[fnList[i]] = true;
        walker.push(fnList[i]);
    }

    if (len === 0) callback(null, codes);

    walker.drain = function () { callback(null, codes) }
};