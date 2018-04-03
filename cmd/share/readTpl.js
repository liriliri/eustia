var handlebars = require('handlebars'),
    async = require('async'),
    path = require('path'),
    fs = require('fs');

var logger = require('../../lib/logger');

var tpl = {};

function readTpl(tplName)
{
    var tplPath = path.resolve(__dirname, '../../tpl/' + tplName + '.hbs');

    return function (cb)
    {
        logger.debug('Read tpl', tplPath);

        fs.readFile(tplPath, 'utf8', function (err, data)
        {
            if (err) return cb(err);

            tpl[tplName] = handlebars.compile(data, { noEscape: true });

            cb();
        });
    };
}

module.exports = function (templates, cb)
{
    var callbacks = templates.map(function (val)
    {
        return readTpl(val);
    });

    async.parallel(callbacks, function (err)
    {
        if (err) return cb(err);

        cb(null, tpl);
    });
};
