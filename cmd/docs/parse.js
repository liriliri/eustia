var FnParser = require('./FnParser'),
    _ = require('../../lib/util');

module.exports = function (ast, units, options, cb)
{
    _.log('Parse raw comments.');

    var result = [];

    _.each(units, function (comments)
    {
        _.each(comments, function (comment)
        {
            if (comment.type !== 'function') return;

            result.push(new FnParser(comment.value).parse());
        });
    });

    ast['function'] = result;

    cb();
};