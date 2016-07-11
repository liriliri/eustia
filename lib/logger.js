var handlebars = require('handlebars'),
    chalk = require('chalk');

var util = require('./util');

var Logger = util.Class({
    initialize: function ()
    {
        this.debug = false;
        this._isEnabled = false;
        this._initHandlebars();
    },
    info: function (msg)
    {
        this.color(msg, 'green');
    },
    error: function (msg)
    {
        this.color(msg, 'red');
    },
    log: function (msg)
    {
        this.color(msg, 'white');
    },
    debug: function (msg)
    {
        if (!this.debug) return;

        this.log(msg);
    },
    warn: function (msg)
    {
        this.color(msg, 'yellow');
    },
    color: function (msg, color)
    {
        this._tpl({msg: msg}, '{{#' + color + '}}{{msg}}{{/' + color + '}}');
    },
    enable: function ()
    {
        this._isEnabled = true;
    },
    disable: function ()
    {
        this._isEnabled = false;
    },
    _tpl: function (msg, tpl)
    {
        msg = handlebars.compile(tpl)(msg);

        this._log(msg);
    },
    _log: function (msg)
    {
        if (!this._isEnabled) return;

        process.stdout.write(msg + '\n');
    },
    _initHandlebars: function ()
    {
        handlebars.registerHelper('rapd', function (len, ctx)
        {
            return util.rpad(ctx.fn(this), +len, ' ');
        });

        SUPPORT_COLORS.forEach(function (color)
        {
            handlebars.registerHelper(color, function (ctx)
            {
                return chalk[color](ctx.fn(this));
            });
        });
    }
});

const SUPPORT_COLORS = ['yellow', 'green', 'cyan', 'red', 'white', 'magenta'];

module.exports = new Logger();
