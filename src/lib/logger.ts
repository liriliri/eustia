import chalk from 'chalk'
import * as handlebars from 'handlebars'
import { format } from 'util'
import * as util from './util'

const Logger = util.Class({
  initialize() {
    this.isDebug = false
    this._isEnabled = false
    this._msgs = []

    this._initHandlebars()
  },
  info(msg) {
    this.color(msg, 'green')
  },
  error(err) {
    this.color(err, 'red', err)
  },
  log(msg) {
    this.color(msg, 'white')
  },
  debug() {
    if (!this.isDebug) {
      return
    }

    this.tpl(
      { data: format.apply(null, util.toArr(arguments)) },
      '{{#red}}DEBUG{{/red}} {{{data}}}'
    )
  },
  warn(msg) {
    this.color(msg, 'yellow')
  },
  color(msg, color, err) {
    this.tpl({ msg }, '{{#' + color + '}}{{{msg}}}{{/' + color + '}}', err)
  },
  history() {
    return util.stripColor(this._msgs.join('\n'))
  },
  enable() {
    this._isEnabled = true
  },
  tpl(msg, tpl, err) {
    msg = handlebars.compile(tpl)(msg)

    this._log(msg, err)
  },
  _log(msg, err) {
    if (!this._isEnabled) {
      return
    }

    this._msgs.push(err ? err.stack : msg)

    process.stdout.write(msg + '\n')
  },
  _initHandlebars() {
    handlebars.registerHelper('rapd', function(len, ctx) {
      return util.rpad(ctx.fn(this), +len, ' ')
    })

    const SUPPORT_COLORS = [
      'yellow',
      'green',
      'cyan',
      'red',
      'white',
      'magenta'
    ]
    SUPPORT_COLORS.forEach(function(color) {
      handlebars.registerHelper(color, function(ctx) {
        return chalk[color](ctx.fn(this))
      })
    })
  }
})

export default new Logger()
