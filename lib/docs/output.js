var fs = require('fs'),
    _ = require('../util');

module.exports = function (ast, template, options, cb)
{
    _.log('Output file: ' + options.output);

    ast.title = options.title;

    var data = options.raw ? JSON.stringify(ast, null, 4) : template(ast);

    fs.writeFile(options.output, data, options.encoding, function (err)
    {
        if (err) return cb(err);
        cb();
    });
};