var path  = require('path'),
    async = require('async'),
    _ = require('./util');

var readTpl  = require('./build/readTpl'),
    scanSrc  = require('./build/scanSrc'),
    genCodes = require('./build/genCodes'),
    output   = require('./build/output');

var options;

function exports(opts)
{
    _.log('Executing...');

    opts.files = opts.argv.remain;

    _.each(opts.files, function (val, idx)
    {
        opts.files[idx] = path.resolve(opts.cwd, val);
    });

    options = opts;

    var codeTpl, resultTpl;

    async.waterfall([
        function (cb) { readTpl(options, cb) },
        function (code, result, cb)
        {
            codeTpl   = code;
            resultTpl = result;
            cb();
        },
        function (cb) { scanSrc(options, cb) },
        function (fnList, cb) { genCodes(fnList, codeTpl, options, cb) },
        function (codes, cb) { output(codes, resultTpl, options, cb) }
    ], function (err)
    {
        if (err) _.log.err(err);

        _.log('Done!');
    });
}

exports.defOpts = {
    encoding: 'utf-8',
    name: '_'
};

module.exports = exports;