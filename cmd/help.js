var async = require('async');

var logger = require('../lib/logger'),
    readTpl = require('./share/readTpl');

function exports(options, cb)
{
    async.waterfall([
        function (cb)
        {
            readTpl(['help', 'helpCmd'], cb);
        },
        function (tpl, cb)
        {
            options.command ? output(options.command, tpl['helpCmd'], cb)
                            : outputAll(tpl['help'], cb);
        }
    ], function (err)
    {
        return err ? cb(err) : cb();
    });
}

function outputAll(tpl, cb)
{
    logger.log(tpl(require('./help/all.json')));

    cb();
}

function output(name, tpl, cb)
{
    try
    {
        var data = require('./help/' + name + '.json');
    } catch(e)
    {
        return cb(new Error('Command not found: ' + name));
    }

    logger.log(tpl(data));

    cb();
}

module.exports = exports;