var nopt = require('nopt');
var packInfo = require('../package.json');

var exports = {};

var options = {};

exports.init = function (args)
{
    var knowOpts = {
        help   : Boolean,
        version: Boolean
    };

    var shortHands = {
        h: ['--help'],
        v: ['--version']
    };

    options = nopt(knowOpts, shortHands, args, 2);

    options.files = options.argv.remain;
    options.cwd   = process.cwd();

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
    console.log('Help is missing currently.');
}

function printVersion()
{
    console.log('eustia ' + packInfo.version);
}

function generateLib()
{

}

module.exports = exports;
