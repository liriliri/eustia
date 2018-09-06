import * as path from 'path'
import * as fs from 'fs'
import * as util from './lib/util'
import logger from './lib/logger'
import build from './cmd/build'
import doc from './cmd/doc'
import cache from './cmd/cache'
import help from './cmd/help'
import version from './cmd/version'

let cwd = process.cwd()
let defOpts = {
  cwd: cwd,
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
let errLogPath = path.resolve(cwd, './eustia-debug.log')

module.exports = {
  build: cmdFactory(build),
  doc: cmdFactory(doc),
  cache: cmdFactory(cache),
  help: cmdFactory(help),
  version: cmdFactory(version)
}

function cmdFactory(cmd) {
  return function(options, cb) {
    cb = cb || util.noop
    options = util.defaults(options, defOpts, cmd.defOpts || {})

    if (options.enableLog) logger.enable()
    if (options.verbose) logger.isDebug = true

    logger.debug('Options', options)

    cmd(options, function(err) {
      if (err) {
        logger.error(err)
        if (options.errLog) {
          // Need to exit immediately, so async fs is not used.
          fs.writeFileSync(errLogPath, logger.history(), 'utf-8')
          process.exit()
        }
      }

      if (options.errLog) {
        fs.exists(errLogPath, function(result) {
          if (result) fs.unlink(errLogPath, () => {})
        })
      }

      cb(err)
    })
  }
}
