var handlebars = require('handlebars'),
    async = require('async'),
    path  = require('path'),
    fs = require('fs'),
    _  = require('../util');

module.exports = function (options, callback)
{
    var codeTpl, resultTpl;

    _.log('Reading templates...');

    async.parallel([
        function (callback)
        {
            var tplPath = path.resolve(options.dirname, './template/code.hbs');

            fs.readFile(tplPath, options.encoding, function (err, data)
            {
                if (err) return callback(err);

                codeTpl = handlebars.compile(data, {noEscape: true});
                callback();
            });
        },
        function (callback)
        {
            var tplPath = path.resolve(options.dirname, './template/umd.hbs');

            fs.readFile(tplPath, options.encoding, function (err, data)
            {
                if (err) return callback(err);

                resultTpl = handlebars.compile(data, {noEscape: true});
                callback();
            });
        }
    ], function (err)
    {
        if (err) return callback(err);

        callback(null, codeTpl, resultTpl);
    });
};