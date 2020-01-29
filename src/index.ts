import fs from 'fs'
import path from 'path'
import build from './cmd/build'
import doc from './cmd/doc'
import help from './cmd/help'
import version from './cmd/version'
import logger from './lib/logger'
import util from './lib/util'

const cwd = process.cwd()
const defOpts = {
  cwd,
  dirname: path.resolve(__dirname, '../'),
  // Prepend to generated file to prevent being scanned again.
  magicNum: '// Built by eustia.',
  data: {},
  enableLog: false,
  debug: false,
  encoding: 'utf8',
  errLog: false,
  packInfo: require('../package.json')
}
const errLogPath = path.resolve(cwd, './eustia-debug.log')

module.exports = {
  build: cmdFactory(build),
  doc: cmdFactory(doc),
  help: cmdFactory(help),
  version: cmdFactory(version)
}

function cmdFactory(cmd: any) {
  return function(options: any, cb: Function) {
    cb = cb || util.noop
    options = util.defaults(options, defOpts, cmd.defOpts || {})
    options.cacheDir = path.resolve(options.cwd, 'eustia/cache')

    if (options.enableLog) {
      logger.enable()
    }
    if (options.verbose) {
      logger.isDebug = true
    }

    logger.debug('Options', options)

    cmd(options, function(err: Error | null, result?: any) {
      if (err) {
        logger.error(err)
        cb(err)
        if (options.errLog) {
          // Need to exit immediately, so async fs is not used.
          fs.writeFileSync(errLogPath, logger.history(), 'utf-8')
          process.exit()
        }
      }

      if (options.errLog) {
        fs.exists(errLogPath, function(result) {
          if (result) {
            fs.unlink(errLogPath, util.noop)
          }
        })
      }

      cb(null, result)
    })
  }
}
