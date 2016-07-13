var fs = require('fs'),
    marked = require('marked');

var util = require('../../lib/util'),
    logger = require('../../lib/logger');

marked.setOptions({
    renderer: new marked.Renderer(),
    langPrefix: 'language-'
});

module.exports = function (ast, template, options, cb)
{
    logger.tpl({
        output: options.output
    }, 'OUTPUT FILE {{#cyan}}{{{output}}}{{/cyan}}');

    ast.title = options.title;

    // If the output type is not markdown, convert data in markdown format.
    if (options.format !== 'md')
    {
        if (ast.description) ast.description = marked(ast.description);

        util.each(ast.docs, function (val, key)
        {
            ast.docs[key] = marked(val);
        });
    }

    var data = options.format === 'json' ? JSON.stringify(ast, null, 4) : template(ast);

    fs.writeFile(options.output, data, options.encoding, function (err)
    {
        if (err) return cb(err);
        cb();
    });
};