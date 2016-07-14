var fs = require('fs');

var util = require('../../lib/util');

module.exports = function (ast, options, cb)
{
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

function process(data)
{
    var ret = {};

    data = breakApart(data);

    util.each(data, function (val)
    {
        val = util.trim(val);
        if (!util.startWith(val, 'var')) return;

        var name = val.slice(4, val.indexOf("=")),
            comments = util.extractBlockCmts(val.slice(val.indexOf('{') + 1, val.lastIndexOf('}')));

        ret[name] = 'No documentation.';

        if (!util.isEmpty(comments)) ret[name] = indentOneSpace(comments[0]);
    });

    return ret;
}

var regSeparator = /\/\* -{30} [\$\w]+ -{30} \*\//;

function breakApart(data)
{
    return data.split(regSeparator).slice(1);
}

var regStartOneSpace = /^ /mg;

function indentOneSpace(data)
{
    return data.replace(regStartOneSpace, '');
}
