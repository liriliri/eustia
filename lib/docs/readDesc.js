var fs = require('fs');

module.exports = function (ast, options, cb)
{
    if (!options.description)
    {
        ast.description = '';
        return cb();
    }

    fs.readFile(options.description, options.encoding, function (err, data)
    {
        if (err) return cb(err);

        ast.description = data;

        cb();
    });
};