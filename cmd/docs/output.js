var fs = require('fs'),
    _ = require('../../lib/util'),
    marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    langPrefix: 'language-'
});

module.exports = function (ast, template, options, cb)
{
    _.log('Output file: ' + options.output);

    ast.title = options.title;

    // If the output type is not markdown, convert data in markdown format.
    if (options.type !== 'md')
    {
        if (ast.description) ast.description = marked(ast.description);

        _.each(ast.docs, function (val, key)
        {
            ast.docs[key] = marked(val);
        });
    }

    var data = options.type === 'json' ? JSON.stringify(ast, null, 4) : template(ast);

    fs.writeFile(options.output, data, options.encoding, function (err)
    {
        if (err) return cb(err);
        cb();
    });
};