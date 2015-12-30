var handlebars = require('handlebars'),
    async = require('async'),
    path  = require('path'),
    fs = require('fs'),
    _  = require('../util');

var tpl = {};

function readTpl(tplName)
{
    var tplPath = path.resolve(__dirname, '../../tpl/' + tplName + '.hbs');

    return function (cb)
    {
        _.log('Read template "' + tplName + '".');

        fs.readFile(tplPath, 'utf-8', function (err, data)
        {
            if (err) return cb(err);

            tpl[tplName] = handlebars.compile(data, { noEscape: true });

            cb();
        });
    };
}

module.exports = function (options, cb)
{
    async.parallel([
        readTpl('code'),
        readTpl('codes'),
        readTpl(options.pattern)
    ], function (err)
    {
        if (err) return cb(err);

        cb(null, tpl);
    });
};