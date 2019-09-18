import handlebars from 'handlebars'
import { format } from 'util'
import util from './util'

class Logger {
  public isDebug: boolean = false
  private isEnabled: boolean = false
  private msgs: any[] = []
  constructor() {
    this.initHandlebars()
  }
  info(msg: string) {
    this.color(msg, 'green')
  }
  error(err: Error) {
    this.color(err.message, 'red', err)
  }
  log(msg: string) {
    this.color(msg, 'white')
  }
  debug(...args: any[]) {
    if (!this.isDebug) {
      return
    }

    this.tpl(
      { data: format.apply(null, args as any) },
      '{{#red}}DEBUG{{/red}} {{{data}}}'
    )
  }
  warn(msg: string) {
    this.color(msg, 'yellow')
  }
  color(msg: string, color: string, err?: Error) {
    this.tpl({ msg }, '{{#' + color + '}}{{{msg}}}{{/' + color + '}}', err)
  }
  history() {
    return util.stripColor(this.msgs.join('\n'))
  }
  enable() {
    this.isEnabled = true
  }
  tpl(msg: any, tpl: string, err?: Error) {
    msg = handlebars.compile(tpl)(msg)

    this._log(msg, err)
  }
  private _log(msg: any, err?: Error) {
    if (!this.isEnabled) {
      return
    }

    this.msgs.push(err ? err.stack : msg)

    process.stdout.write(msg + '\n')
  }
  private initHandlebars() {
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
        return (util.ansiColor as any)[color](ctx.fn(this))
      })
    })
  }
}

export default new Logger()
