var async = require('async'),
    path  = require('path'),
    extractCmt = require('./docs/extractCmt'),
    parse      = require('./docs/parse'),
    readTpl    = require('./share/readTpl'),
    output     = require('./docs/output'),
    _ = require('./util');

function exports(options, cb)
{
    cb = cb || _.noop;

    var startTime = _.now(),
        template, ast = {};

    options.output = path.resolve(options.cwd, options.output);

    async.waterfall([
        function (cb) { readTpl(['docs'], options, cb) },
        function (tpl, cb) { template = tpl['docs']; cb() },
        function (cb) { extractCmt(options, cb) },
        function (units, cb) { parse(ast, units, options, cb)},
        function (cb) { output(ast, template, options, cb) }
    ], function (err)
    {
        if (err) return cb(err);

        _.log.ok('Done, cost ' + (_.now() - startTime) + 'ms.');

        cb();
    });
}

exports.defOpts = {
    input   : 'util.js',
    output  : 'docs.html',
    encoding: 'utf-8',
    title   : 'Eustia Documentation',
    raw     : false
};

module.exports = exports;