var _     = require('../lib/util'),
    fs    = require('fs'),
    async = require('async'),
    path  = require('path');

var templates = {};

function readTpl(tplName)
{
    var tplPath = path.resolve(__dirname, '../tpl/' + tplName + '.hbs');

    return function (cb)
    {
        fs.readFile(tplPath, 'utf-8', function (err, data)
        {
            if (err) return cb(err);

            templates[tplName] = data;

            cb();
        });
    };
}

function outputAll(cb)
{
    var data = require('./help/all.json');

    _.log(data, templates['help']);

    cb();
}

function output(name, cb)
{
    try {
        var data = require('./help/' + name + '.json');
    } catch(e)
    {
        return cb('Command not found: ' + name);
    }

    _.log(data, templates['helpCmd']);

    cb();
}

function exports(options, cb)
{
    async.waterfall([
        readTpl('help'),
        readTpl('helpCmd')
    ], function (err)
    {
        if (err) return cb(err);

        if (options.command) return output(options.command, cb);

        outputAll(cb);
    });
}

exports.defOpts = {};

module.exports = exports;