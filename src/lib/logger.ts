var handlebars = require('handlebars'),
  chalk = require('chalk');

var util = require('./util'),
  format = require('util').format;

var Logger = util.Class({
  initialize: function() {
    this.isDebug = false;
    this._isEnabled = false;
    this._msgs = [];

    this._initHandlebars();
  },
  info: function(msg) {
    this.color(msg, 'green');
  },
  error: function(err) {
    this.color(err, 'red', err);
  },
  log: function(msg) {
    this.color(msg, 'white');
  },
  debug: function() {
    if (!this.isDebug) return;

    this.tpl(
      { data: format.apply(null, util.toArr(arguments)) },
      '{{#red}}DEBUG{{/red}} {{{data}}}'
    );
  },
  warn: function(msg) {
    this.color(msg, 'yellow');
  },
  color: function(msg, color, err) {
    this.tpl(
      { msg: msg },
      '{{#' + color + '}}{{{msg}}}{{/' + color + '}}',
      err
    );
  },
  history: function() {
    return util.stripColor(this._msgs.join('\n'));
  },
  enable: function() {
    this._isEnabled = true;
  },
  tpl: function(msg, tpl, err) {
    msg = handlebars.compile(tpl)(msg);

    this._log(msg, err);
  },
  _log: function(msg, err) {
    if (!this._isEnabled) return;

    this._msgs.push(err ? err.stack : msg);

    process.stdout.write(msg + '\n');
  },
  _initHandlebars: function() {
    handlebars.registerHelper('rapd', function(len, ctx) {
      return util.rpad(ctx.fn(this), +len, ' ');
    });

    var SUPPORT_COLORS = ['yellow', 'green', 'cyan', 'red', 'white', 'magenta'];
    SUPPORT_COLORS.forEach(function(color) {
      handlebars.registerHelper(color, function(ctx) {
        return chalk[color](ctx.fn(this));
      });
    });
  }
});

module.exports = new Logger();
