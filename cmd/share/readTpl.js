var handlebars = require('handlebars'),
    async = require('async'),
    path  = require('path'),
    fs = require('fs'),
    logger = require('../../lib/logger'),
    _  = require('../../lib/util');

var tpl = {};

function readTpl(tplName)
{
    var tplPath = path.resolve(__dirname, '../../tpl/' + tplName + '.hbs');

    return function (cb)
    {
        logger.debug('Read tpl', tplPath);

        fs.readFile(tplPath, 'utf-8', function (err, data)
        {
            if (err) return cb(err);

            tpl[tplName] = handlebars.compile(data, { noEscape: true });

            cb();
        });
    };
}

module.exports = function (templates, options, cb)
{
    var callbacks = _.map(templates, function (val) { return readTpl(val) });

    async.parallel(callbacks, function (err)
    {
        if (err) return cb(err);

        cb(null, tpl);
    });
};
