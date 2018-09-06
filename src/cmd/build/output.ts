import * as fs from 'fs'
import * as util from '../../lib/util'
import logger from '../../lib/logger'

export default function(codes, codesTpl, formatTpl, options, cb) {
  let code = ''
  let dependencyGraph = []
  let allDependencies = []
  let codesMap = {}
  let codesOrder

  // Sort codes first so that the generated file stays the same
  // when no method is added or removed.
  codes = codes.sort(function(a, b) {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1

    return 0
  })

  util.each(codes, function(code) {
    let dependencies = code.dependencies

    dependencyGraph.push(['', code.name])
    util.each(dependencies, function(dependency) {
      dependencyGraph.push([dependency, code.name])
      allDependencies.push(dependency)
    })

    codesMap[code.name] = code.code
  })

  allDependencies = util.unique(allDependencies)

  try {
    codesOrder = util.topoSort(dependencyGraph)
    // The first one is just a empty string, need to exclude it.
    codesOrder.shift()
  } catch (e) {
    return cb(e)
  }

  for (let i = 0, len = codesOrder.length; i < len; i++) {
    let name = codesOrder[i]
    let c = codesMap[name]

    if (!util.contain(allDependencies, name) && options.format !== 'es') {
      c = util.trim(
        c.replace(
          new RegExp('^\\s*var ' + util.escapeRegExp(name) + ' = ', 'm'),
          ''
        )
      )
    }

    code += c
    if (i !== len - 1) code += '\n\n'
  }

  let codesData: any = {
    code: code,
    namespace: options.namespace,
    strict: options.strict,
    commonjs: options.format === 'commonjs',
    es: options.format === 'es',
    inBrowser: options.format === 'umd' || options.format === 'global'
  }

  let excludeRef = options.data.excludeRef
  if (excludeRef.length > 0) {
    excludeRef = excludeRef.sort()
    codesData.excludeRef = util.unique(excludeRef)
  }

  let result = codesTpl(codesData)

  result = result.replace(/\n\s*\n/g, '\n\n')

  if (options.format !== 'commonjs' && options.format !== 'es') {
    result = util.indent(result)
    result = formatTpl({
      namespace: options.namespace,
      codes: result
    })
  }

  result = options.magicNum + '\n' + result

  logger.tpl(
    {
      data: codesOrder.sort().join(' ')
    },
    'MODULES GENERATED\n{{#cyan}}{{{data}}}{{/cyan}}'
  )

  logger.tpl(
    {
      output: options.output
    },
    'OUTPUT FILE {{#cyan}}{{{output}}}{{/cyan}}'
  )

  fs.writeFile(options.output, result, options.encoding, function(err) {
    if (err) return cb(err)
    cb()
  })
}
