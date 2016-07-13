var async = require('async'),
    path = require('path');

var extractCmt = require('./doc/extractCmt'),
    readDesc = require('./doc/readDesc'),
    readTpl = require('./share/readTpl'),
    output = require('./doc/output'),
    logger = require('../lib/logger'),
    util = require('../lib/util');

function exports(options, cb)
{
    var startTime = util.now(),
        template, ast = {};

    options.output = path.resolve(options.cwd, options.output);
    if (options.description) options.description = path.resolve(options.cwd, options.description);

    var docsTpl = 'docs';
    if (options.format === 'md') docsTpl = 'docsMd';

    async.waterfall([
        function (cb)
        {
            readTpl([docsTpl], cb);
        },
        function (tpl, cb)
        {
            template = tpl[docsTpl];
            cb();
        },
        function (cb)
        {
            extractCmt(ast, options, cb);
        },
        function (cb)
        {
            readDesc(ast, options, cb);
        },
        function (cb)
        {
            output(ast, template, options, cb);
        }
    ], function (err)
    {
        if (err) return cb(err);

        logger.info('TIME COST ' + (util.now() - startTime) + 'ms.');

        cb();
    });
}

exports.defOpts = {
    input: 'util' + '.js',
    output: 'docs.html',
    title: 'Eustia Documentation',
    format: 'html'
};

module.exports = exports;