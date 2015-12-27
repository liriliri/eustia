_('rpad each');

var handlebars = require('handlebars'),
    chalk      = require('chalk'),
    path = require('path'),
    fs   = require('fs');

handlebars.registerHelper('rapd', function (len, ctx)
{
    return rpad(ctx.fn(this), parseInt(len, 10), ' ');
});

each(['yellow', 'green', 'cyan', 'red', 'white', 'magenta'], function (color)
{
    handlebars.registerHelper(color, function (ctx)
    {
        return chalk[color](ctx.fn(this));
    });
});

var msgs = [], enabled = false;

log = function (msg, tpl)
{
    if (!enabled) return;

    if (tpl) msg = handlebars.compile(tpl, { noEscape: true })(msg);

    // All messages is pushed into msgs for debugging purpose when error occurs.
    msgs.push(msg);

    process.stdout.write(msg + '\n');
};

log.err = function (msg)
{
    log.color(msg, 'red');

    var logPath = path.resolve(process.cwd(), './eustia-debug.log');

    fs.writeFileSync(logPath, msgs.join('\n'), 'utf-8');

    process.exit();
};

log.warn = function (msg) { log.color(msg, 'yellow') };

log.ok = function (msg) { log.color(msg, 'green') };

log.color = function (msg, color)
{
    log({
        msg: msg
    }, '{{#' + color + '}}{{msg}}{{/' + color + '}}');
};

log.enable = function () { enabled = true };
