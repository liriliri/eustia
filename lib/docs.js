var async = require('async'),
    path  = require('path'),
    extractCmt = require('./docs/extractCmt'),
    parse      = require('./docs/parse'),
    readDesc   = require('./docs/readDesc'),
    readTpl    = require('./share/readTpl'),
    output     = require('./docs/output'),
    _ = require('./util');

function exports(options, cb)
{
    cb = cb || _.noop;

    var startTime = _.now(),
        template, ast = {};

    options.output = path.resolve(options.cwd, options.output);
    if (options.description) options.description = path.resolve(options.cwd, options.description);

    var docsTpl = 'docs';

    if (options.type === 'md') docsTpl = 'docsMd';

    async.waterfall([
        function (cb) { readTpl([docsTpl], options, cb) },
        function (tpl, cb) { template = tpl[docsTpl]; cb() },
        function (cb) { extractCmt(options, cb) },
        function (units, cb) { parse(ast, units, options, cb)},
        function (cb) { readDesc(ast, options, cb) },
        function (cb) { output(ast, template, options, cb) }
    ], function (err)
    {
        if (err) return cb(err);

        _.log.ok('Done, cost ' + (_.now() - startTime) + 'ms.');

        cb();
    });
}

exports.defOpts = {
    input : 'util.js',
    output: 'docs.html',
    title : 'Eustia Documentation',
    type  : 'html',
    raw   : false
};

module.exports = exports;