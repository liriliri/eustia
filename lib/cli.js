var nopt = require('nopt'),
    _    = require('./util'),
    path = require('path');

var generator = require('./generator'),
    logger    = require('./logger');

var packInfo = require('../package.json');

var exports = {};

var defOpts =
{
    cwd     : process.cwd(),
    dirname : path.resolve(__dirname, '../'),
    files   : [],
    encoding: 'utf-8'
};

var options = {};

exports.init = function (args)
{
    var knowOpts = {
        help    : Boolean,
        version : Boolean,
        encoding: String,
        out     : String
    };

    var shortHands = {
        h: '--help',
        v: '--version',
        o: '--out',
        e: '--encoding'
    };

    options = _.deepExtend({}, defOpts, nopt(knowOpts, shortHands, args, 2));

    options.files = options.argv.remain;

    _.each(options.files, function (val, idx)
    {
        options.files[idx] = path.resolve(options.cwd, val);
    });

    return exports;
};

exports.run = function ()
{
    if (options.help)    return printHelp();
    if (options.version) return printVersion();
    if (options.files.length === 0) return printHelp();

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
