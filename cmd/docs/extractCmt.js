var fs = require('fs'),
    _ = require('../../lib/util');

function breakApart(data)
{
    return data.split(/\/\* -{30} [\$\w]+ -{30} \*\//).slice(1);
}

function process(data)
{
    var ret = {};

    data = breakApart(data);

    _.each(data, function (val)
    {
        val = _.trim(val);
        if (!_.startWith(val, 'var')) return;

        var name = val.slice(4, val.indexOf("=")),
            comments = _.extractBlockCmts(val.slice(val.indexOf('{') + 1, val.lastIndexOf('}')));

        ret[name] = 'No documentation.';

        if (comments.length > 0) ret[name] = comments[0];
    });

    return ret;
}

module.exports = function (ast, options, cb)
{
    _.log('Extract block comments.');

    fs.exists(options.input, function (result)
    {
        if (!result) return cb('Not found: ' + options.input);

        fs.readFile(options.input, options.encoding, function (err, data)
        {
            if (err) return cb(err);

            ast['docs'] = process(data);

            cb();
        });
    });
};