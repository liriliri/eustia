var _     = require('./util'),
    fs    = require('fs'),
    async = require('async'),
    path  = require('path');

var templates = {};

function readTpl(tplName)
{
    var tplPath = path.resolve(__dirname, '../template/' + tplName + '.hbs');

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

function outputAll()
{
    var data = require('./help/all.json');

    _.log(data, templates['help']);
}

function output(name)
{
    try {
        var data = require('./help/' + name + '.json');
    } catch(e)
    {
        _.log.err('Command not found: ' + name);
    }

    _.log(data, templates['helpCmd']);
}

function exports(options)
{
    async.waterfall([
        readTpl('help'),
        readTpl('helpCmd')
    ], function (err)
    {
        if (err) _.log.err(err);

        if (options.name) return output(options.name);

        outputAll();
    });
}

exports.defOpts = {};

module.exports = exports;