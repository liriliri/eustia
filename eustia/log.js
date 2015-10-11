'rpad each';

var handlebars = require('handlebars'),
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

exports = function (msg)
{
    console.log(msg);
};

exports.err = function (msg)
{
    console.log(msg);
    process.exit();
};