import * as path from 'path'
import * as util from '../../lib/util'
import logger from '../../lib/logger'
import readPaths from '../../lib/readPaths'

export default function(options, cb) {
  if (util.isEmpty(options.files)) {
    options.data.fnPercentage = {}
    return cb(null, options.include.sort())
  }

  logger.log('SCAN FILES')
  logger.color(options.files.join('\n'), 'cyan')

  var files = options.files,
    modList = options.include

  readPaths(files, options, function(err, files) {
    if (err) return cb(err)

    files.forEach(function(file) {
      if (util.startWith(file.data, options.magicNum)) return

      file.data = util.stripCmt(file.data)

      var modules = extractModule(file, options)

      if (modules.length !== 0) logger.debug('File', file.path, 'has', modules)

      modList = modList.concat(modules)
    })

    modList = modList.map(function(fnName) {
      return util.trim(fnName)
    })

    options.data.fnPercentage = getFnPercentage(modList, files.length)

    modList = util.unique(modList).filter(function(fnName) {
      return !util.contain(options.exclude, fnName)
    })

    cb(null, modList.sort())
  })
}

var regCommonjs = /require\(.*\)/,
  regEs6 = /\bimport\b/

function extractModule(file, options) {
  var ret = []

  // Mixed use of commonjs and es6 module pattern is possible.
  if (regCommonjs.test(file.data))
    ret = ret.concat(extractCommonjs(options, file))
  if (regEs6.test(file.data)) ret = ret.concat(extractEs6(options, file))
  ret = ret.concat(extractGlobal(options.namespace, file))

  return util.unique(ret)
}

var regModules = {
  _cache: {},
  get: function(namespace) {
    var ret

    ret = this._cache[namespace]
    if (ret) return ret

    ret = this._cache[namespace] = new RegExp(
      '\\b' + namespace + '((\\.[\\$_\\w]+)|(\\[[\'"][\\$_\\w]+[\'"]\\]))',
      'g'
    )

    return ret
  }
}

function extractGlobal(namespace, file) {
  var modules = file.data.match(regModules.get(namespace))

  return modules
    ? util.map(modules, function(val) {
        val = val.substr(namespace.length)
        val = val[0] === '[' ? val.slice(2, -2) : val.slice(1)

        return val
      })
    : []
}

function extractCommonjs(options, file) {
  var requirePath = relativePath(file.path, options.output),
    regRequire = new RegExp(
      '(\\w+)\\s*=\\s*require\\([\'"]' + requirePath + '(?:\\.js)?[\'"]\\)'
    ),
    namespace = file.data.match(regRequire)

  if (namespace) namespace = namespace[1]

  return extractGlobal(namespace ? namespace : options.namespace, file)
}

function relativePath(from, to) {
  var ret = path
    .relative(path.dirname(from), to)
    .replace(/\\/g, '/')
    .replace(/\.js$/, '')
    .replace(/\./g, '\\.')

  if (!util.startWith(ret, '\\.')) ret = '\\./' + ret

  return ret
}

function extractEs6(options, file) {
  var ret = []

  // import util from './util'
  var requirePath = relativePath(file.path, options.output),
    regImport = new RegExp(
      'import\\s+(\\w+)\\s+from\\s*[\'"]' + requirePath + '[\'"]'
    ),
    namespace = file.data.match(regImport)

  if (namespace) {
    namespace = namespace[1]
    ret = ret.concat(extractGlobal(namespace, file))
  }

  // import * as util from './util'
  var requirePath = relativePath(file.path, options.output),
    regImport = new RegExp(
      'import\\s+(\\*\\s+as)\\s+(\\w+)\\s+from\\s*[\'"]' + requirePath + '[\'"]'
    ),
    namespace = file.data.match(regImport)

  if (namespace) {
    namespace = namespace[2]
    ret = ret.concat(extractGlobal(namespace, file))
  }

  // import {xxx, xx} from '.util'
  var regImportMembers = new RegExp(
      'import\\s*{([\\w,\\$\\s]+)}\\s*from\\s*[\'"]' + requirePath + '[\'"]'
    ),
    methods = file.data.match(regImportMembers)

  if (methods) ret = ret.concat(methods[1].split(','))

  return ret
}

function getFnPercentage(fnList, filesNum) {
  var ret = {}

  fnList.forEach(function(fnName) {
    ret[fnName] = ret[fnName] !== undefined ? ret[fnName] + 1 : 1
  })

  util.each(ret, function(val, key) {
    ret[key] = ((val / filesNum) * 100).toFixed(2) + '%'
  })

  return ret
}
