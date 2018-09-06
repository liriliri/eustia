import * as async from 'async'
import * as fs from 'fs'
import * as path from 'path'
import downloadMod from '../../lib/downloadMod'
import * as util from '../../lib/util'
import logger from '../../lib/logger'

var regDependency = /\s*\b_\(\s*['"]([\w\s$]+)['"]\s*\);?/m,
  regExports = /\bexports\b/,
  regFnExports = /function\s+exports\s*\(/

export default function(modName, codeTpl, options, cb) {
  var fnPercentage = options.data.fnPercentage,
    percentage

  if (util.has(fnPercentage, modName)) percentage = fnPercentage[modName]

  percentage = percentage ? ' (' + percentage + ')' : ''

  var result: any = {},
    paths = []

  util.each(options.libPaths, function(libPath) {
    util.each(options.extension, function(extension) {
      paths.push(path.resolve(libPath, modName + '.' + extension))
    })
  })

  function detectAndGenCode() {
    async.detect(
      paths,
      function(filePath, callback) {
        fs.access(filePath, function(err) {
          callback(null, !err)
        })
      },
      function(err, filePath) {
        if (util.isUndef(filePath)) {
          var dest = path.resolve(options.dirname, 'cache', modName + '.js')

          return downloadMod(modName, dest, options, function(err) {
            if (err) return cb(err)

            detectAndGenCode()
          })
        }

        fs.readFile(filePath, options.encoding, function(err, data) {
          if (err) return cb(err)

          data = transData(filePath, data, modName, options)

          var dependencies = regDependency.exec(data)
          dependencies = dependencies
            ? util.trim(dependencies[1]).split(/\s+/)
            : []

          data = util.indent(
            data.replace(regDependency, '\n\n/* dependencies\n * $1 \n */')
          )
          data = codeTpl({
            name: modName,
            code: util.trim(data),
            es: options.format === 'es',
            noFnExports: !regFnExports.test(data),
            hasExports: regExports.test(data)
          })

          result.dependencies = dependencies
          result.name = modName
          result.code = data

          logger.tpl(
            {
              modName: modName,
              percentage: percentage,
              dependencies: util.isEmpty(dependencies)
                ? ''
                : ' <= ' + dependencies.join(' ')
            },
            'BUILD MODULE {{#cyan}}{{{modName}}}{{/cyan}}{{{dependencies}}}{{{percentage}}}'
          )

          cb(null, result)
        })
      }
    )
  }

  detectAndGenCode()
}

function transData(filePath, src, modName, options) {
  var transpiler = options.transpiler

  util.each(transpiler, function(item) {
    if (item.exclude && item.exclude.test(filePath)) return

    if (item.test.test(filePath)) {
      util.each(item.handler, function(handler) {
        src = handler.call(item, src, modName)
      })
    }
  })

  return src
}
