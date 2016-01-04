var fs = require('fs'),
    _ = require('../util');

function breakApart(data)
{
    data = data.slice(data.indexOf('_define') + 1,  data.lastIndexOf('_init'));
    data = data.slice(data.indexOf('_define'));

    return data.split('_define(\'');
}

function process(data)
{
    var ret = {};

    data = breakApart(data);

    _.each(data, function (val)
    {
        var name = val.slice(0, val.indexOf("'")),
            comments = _.extractBlockCmts(val.slice(val.indexOf('{') + 1, val.lastIndexOf('}')));

        if (comments.length === 0) return;

        ret[name] = [];

        _.each(comments, function (comment)
        {
            if (_.startWith(comment, 'function'))
            {
                return ret[name].push({ type: 'function', value: _.trim(comment.slice(8))});
            }
        });

        if (ret[name].length === 0) delete ret[name];
    });

    return ret;
}

module.exports = function (options, cb)
{
    _.log('Extract block comments.');

    fs.exists(options.input, function (result)
    {
        if (!result) return cb('Not found: ' + options.input);

        fs.readFile(options.input, options.encoding, function (err, data)
        {
            if (err) return cb(err);

            cb(null, process(data));
        });
    });
};