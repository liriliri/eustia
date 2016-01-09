var fs = require('fs'),
    marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    langPrefix: 'language-'
});

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

        ast.description = marked(data);

        cb();
    });
};