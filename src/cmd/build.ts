import * as async from 'async'
import * as chokidar from 'chokidar'
import * as path from 'path'
import * as qs from 'qs'
import logger from '../lib/logger'
import readTpl from '../lib/readTpl'
import * as util from '../lib/util'
import buildMods from './build/buildMods'
import output from './build/output'
import scanSrc from './build/scanSrc'

export default function build(options: any, cb: Function) {
  transArrOpts(options)
  transTranspilerOpt(options, cb)
  handleEmptyFiles(options)
  resolvePaths(options)

  let templates: any

  build(options.watch)

  if (options.watch) {
    const watchPaths = options.files.concat(options.libPaths)

    chokidar
      .watch(watchPaths, {
        persistent: true,
        ignored: options.output,
        ignoreInitial: true,
        followSymlinks: true,
        usePolling: true,
        alwaysStat: false,
        interval: 100,
        atomic: true,
        ignorePermissionErrors: false
      })
      .on('change', function() {
        build(true)
      })
  }

  function build(isWatching: boolean) {
    options.data = {}

    const startTime = util.now()

    async.waterfall(
      [
        function(cb: Function) {
          const tplList = ['code', 'codes']

          const format = options.format
          if (format !== 'commonjs' && format !== 'es') {
            tplList.push(format)
          }

          readTpl(tplList, cb)
        },
        function(tpl: any, cb: Function) {
          templates = tpl
          cb()
        },
        function(cb: Function) {
          scanSrc(options, cb)
        },
        function(fnList: string[], cb: Function) {
          buildMods(fnList, templates.code, options, cb)
        },
        async function(codes: any[], cb: Function) {
          try {
            await output(
              codes,
              templates.codes,
              templates[options.format],
              options
            )
          } catch (e) {
            cb(e)
          }

          cb()
        }
      ],
      function(err?: Error) {
        if (err) {
          if (isWatching) {
            return logger.error(err)
          }
          return cb(err)
        }

        logger.info('TIME COST ' + (util.now() - startTime) + 'ms.')

        cb()
      }
    )
  }
}

;(build as any).defOpts = {
  namespace: '_',
  format: 'umd',
  output: './util' + '.js', // Split it to avoid being scanned.
  extension: 'js',
  strict: true,
  ts: false,
  transpiler: [],
  files: [],
  ignore: [],
  library: [],
  include: [],
  exclude: [],
  watch: false,
  removeComments: false
}

function transArrOpts(options: any) {
  const ARR_OPTIONS = [
    'library',
    'include',
    'exclude',
    'ignore',
    'files',
    'extension',
    'transpiler'
  ]
  ARR_OPTIONS.forEach(function(key) {
    options[key] = util.toArr(options[key])
  })
}

function transTranspilerOpt(options: any, cb: Function) {
  const cwd = options.cwd

  options.transpiler.forEach(function(transpiler: any) {
    transpiler.handler = util.toArr(transpiler.handler)

    const handlers = transpiler.handler

    util.each(handlers, function(handler: any, idx) {
      if (util.isStr(handler)) {
        handler = handler.split('?')
        const handlerName = handler[0]
        let options = {}

        if (handler[1]) {
          options = qs.parse(handler[1])
        }
        try {
          const requirePath = path.resolve(
            cwd,
            'node_modules/eustia-' + handlerName
          )
          handlers[idx] = require(requirePath)(options)
        } catch (e) {
          cb(e)
        }
      }
    })
  })
}

function handleEmptyFiles(options: any) {
  // If files are empty, scan html and js files in current working directory.
  if (util.isEmpty(options.files) && util.isEmpty(options.include)) {
    options.files = ['./*.html', './*.js']
  }
}

function resolvePaths(options: any) {
  options.files = options.files.map((val: string) =>
    path.resolve(options.cwd, val)
  )

  options.output = path.resolve(options.cwd, options.output)

  const libPaths = [options.cacheDir]
  libPaths.push(path.resolve(options.cwd, 'eustia'))
  options.library.forEach(function(library: any) {
    if (util.isStr(library)) {
      if (!util.isUrl(library)) {
        library = path.resolve(library)
      }
      libPaths.push(library)
    } else if (util.isFn(library)) {
      libPaths.push(library)
    }
  })
  const DOWNLOAD_URL_PREFIX = 'https://cdn.jsdelivr.net/npm/eustia-module/'
  libPaths.push('https://cdn.jsdelivr.net/npm/eustia-module/')

  options.libPaths = libPaths

  logger.log('LIBRARY PATHS')
  logger.color(libPaths.join('\n'), 'cyan')
}
