var nopt = require('nopt'),
    path = require('path');

var generator = require('./generator'),
    logger    = require('./logger');

var packInfo = require('../package.json');

var exports = {};

var options = {};

exports.init = function (args)
{
    var knowOpts = {
        help   : Boolean,
        version: Boolean,
        out    : String
    };

    var shortHands = {
        h: ['--help'],
        v: ['--version'],
        o: ['--out']
    };

    options = nopt(knowOpts, shortHands, args, 2);

    options.files   = options.argv.remain;
    options.cwd     = process.cwd();
    options.dirname = path.resolve(__dirname, '../');
    for (var i = 0, len = options.files.length; i < len; i++)
    {
        options.files[i] = path.resolve(options.cwd, options.files[i]);
    }

    return exports;
};

exports.run = function ()
{
    if (options.help)    return printHelp();
    if (options.version) return printVersion();

    generateLib();
};

function printHelp()
{
    logger('Help is missing currently.');
}

function printVersion()
{
    logger('eustia ' + packInfo.version);
}

function generateLib()
{
    generator.exec(options);
}

module.exports = exports;
