import * as path from 'path'
import logger from '../../lib/logger'
import readPaths from '../../lib/readPaths'
import * as util from '../../lib/util'

export default function(options: any, cb: Function) {
  if (util.isEmpty(options.files)) {
    options.data.fnPercentage = {}
    return cb(null, options.include.sort())
  }

  logger.log('SCAN FILES')
  logger.color(options.files.join('\n'), 'cyan')

  const files = options.files
  let modList = options.include

  readPaths(files, options, function(err: Error | null, files: any[]) {
    if (err) {
      return cb(err)
    }

    files.forEach(function(file) {
      if (util.startWith(file.data, options.magicNum)) {
        return
      }

      file.data = util.stripCmt(file.data)

      const modules = extractModule(file, options)

      if (modules.length !== 0) {
        logger.debug('File', file.path, 'has', modules)
      }

      modList = modList.concat(modules)
    })

    modList = modList.map(function(fnName: string) {
      return util.trim(fnName)
    })

    options.data.fnPercentage = getFnPercentage(modList, files.length)

    modList = util.unique(modList).filter(function(fnName) {
      return !util.contain(options.exclude, fnName)
    })

    cb(null, modList.sort())
  })
}

const regCommonjs = /require\(.*\)/
const regEs6 = /\bimport\b/

function extractModule(file: any, options: any) {
  let ret: string[] = []

  // Mixed use of commonjs and es6 module pattern is possible.
  if (regCommonjs.test(file.data)) {
    ret = ret.concat(extractCommonjs(options, file))
  }
  if (regEs6.test(file.data)) {
    ret = ret.concat(extractEs6(options, file))
  }
  ret = ret.concat(extractGlobal(options.namespace, file))

  ret = util.map(ret, module => util.trim(module))
  ret = util.filter(ret, module => module !== '')
  
  return util.unique(ret)
}

const regModules = {
  _cache: {},
  get(namespace: string) {
    let ret

    ret = this._cache[namespace]
    if (ret) {
      return ret
    }

    ret = this._cache[namespace] = new RegExp(
      '\\b' + namespace + '((\\.[\\$_\\w]+)|(\\[[\'"][\\$_\\w]+[\'"]\\]))',
      'g'
    )

    return ret
  }
}

function extractGlobal(namespace: string, file: any) {
  const modules = file.data.match(regModules.get(namespace))

  return modules
    ? util.map(modules, function(val: string) {
        val = val.substr(namespace.length)
        val = val[0] === '[' ? val.slice(2, -2) : val.slice(1)

        return val
      })
    : []
}

function extractCommonjs(options: any, file: any) {
  const requirePath = relativePath(file.path, options.output)
  const regRequire = new RegExp(
    '(\\w+)\\s*=\\s*require\\([\'"]' + requirePath + '(?:\\.js)?[\'"]\\)'
  )
  let namespace = file.data.match(regRequire)

  if (namespace) {
    namespace = namespace[1]
  }

  return extractGlobal(namespace ? namespace : options.namespace, file)
}

function relativePath(from: string, to: string) {
  let ret = path
    .relative(path.dirname(from), to)
    .replace(/\\/g, '/')
    .replace(/\.js$/, '')
    .replace(/\./g, '\\.')

  if (!util.startWith(ret, '\\.')) {
    ret = '\\./' + ret
  }

  return ret
}

function extractEs6(options: any, file: any) {
  let ret: string[] = []

  // import util from './util'
  let requirePath = relativePath(file.path, options.output)
  let regImport = new RegExp(
    'import\\s+(\\w+)\\s+from\\s*[\'"]' + requirePath + '[\'"]'
  )
  let namespace = file.data.match(regImport)

  if (namespace) {
    namespace = namespace[1]
    ret = ret.concat(extractGlobal(namespace, file))
  }

  // import * as util from './util'
  requirePath = relativePath(file.path, options.output)
  regImport = new RegExp(
    'import\\s+(\\*\\s+as)\\s+(\\w+)\\s+from\\s*[\'"]' + requirePath + '[\'"]'
  )
  namespace = file.data.match(regImport)

  if (namespace) {
    namespace = namespace[2]
    ret = ret.concat(extractGlobal(namespace, file))
  }

  // import {xxx, xx} from '.util'
  const regImportMembers = new RegExp(
    'import\\s*{([\\w,\\$\\s]+)}\\s*from\\s*[\'"]' + requirePath + '[\'"]'
  )
  const methods = file.data.match(regImportMembers)

  if (methods) {
    ret = ret.concat(methods[1].split(','))
  }

  return ret
}

function getFnPercentage(fnList: string[], filesNum: number) {
  const ret: any = {}

  fnList.forEach(function(fnName) {
    ret[fnName] = ret[fnName] !== undefined ? ret[fnName] + 1 : 1
  })

  util.each(ret, function(val: number, key) {
    ret[key] = ((val / filesNum) * 100).toFixed(2) + '%'
  })

  return ret
}
