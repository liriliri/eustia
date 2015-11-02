'rpad each';

var handlebars = require('handlebars'),
    fs         = require('fs'),
    chalk      = require('chalk');

handlebars.registerHelper('rapd', function (len, ctx)
{
    return rpad(ctx.fn(this), parseInt(len, 10));
});

each(['yellow', 'green', 'cyan', 'red', 'white', 'magenta'], function (color)
{
    handlebars.registerHelper(color, function (ctx)
    {
        return chalk[color](ctx.fn(this));
    });
});

log = function (msg)
{
    process.stdout.write(msg + '\n');
};

log.err = function (msg)
{
    process.stdout.write(msg + '\n');
    process.exit();
};

var tpl = {};

log.tpl = function (msg, tplPath)
{
    if (tpl[tplPath])
    {
        log(tpl[tplPath](msg));
    } else
    {
        fs.readFile(tplPath, 'utf-8', function (err, data)
        {
            if (err) return;

            tpl[tplPath] = handlebars.compile(data, {noEscape: true});

            log(tpl[tplPath](msg));
        });
    }
};