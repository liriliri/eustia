var _    = require('./util'),
    path = require('path');

var options;

function outputAll()
{
    var tplPath = path.resolve(options.dirname, './template/help.hbs'),
        data    = require('./help/all.json');

    _.log.tpl(data, tplPath);
}

function output(name)
{
    var tplPath = path.resolve(options.dirname, './template/helpCmd.hbs'), data;

    try {
        data = require('./help/' + name + '.json');
    } catch(e)
    {
        _.log.err('Command not found: ' + name);
    }

    _.log.tpl(data, tplPath);
}

function exports(opts)
{
    options = opts;

    if (options.name) return output(options.name);

    outputAll();
}

exports.defOpts = {
    name: "build"
};

module.exports = exports;