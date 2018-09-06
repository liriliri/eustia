import * as fs from 'fs-extra'
import logger from '../../lib/logger'
import * as util from '../../lib/util'

export default async function(codes, codesTpl, formatTpl, options) {
  let code = ''
  let tsResult = ''
  const dependencyGraph = []
  let allDependencies = []
  const codesMap = {}
  let codesOrder

  // Sort codes first so that the generated file stays the same
  // when no method is added or removed.
  codes = codes.sort(function(a, b) {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }

    return 0
  })

  util.each(codes, function(code) {
    const dependencies = code.dependencies

    dependencyGraph.push(['', code.name])
    util.each(dependencies, function(dependency) {
      dependencyGraph.push([dependency, code.name])
      allDependencies.push(dependency)
    })

    codesMap[code.name] = code.code
  })

  allDependencies = util.unique(allDependencies)

  codesOrder = util.topoSort(dependencyGraph)
  // The first one is just a empty string, need to exclude it.
  codesOrder.shift()

  for (let i = 0, len = codesOrder.length; i < len; i++) {
    const name = codesOrder[i]
    let c = codesMap[name]

    if (options.ts) {
      const ts = extractTs(c)
      if (ts) {
        tsResult += extractTs(c) + '\n\n'
      }
    }

    if (!util.contain(allDependencies, name) && options.format !== 'es') {
      c = util.trim(
        c.replace(
          new RegExp('^\\s*var ' + util.escapeRegExp(name) + ' = ', 'm'),
          ''
        )
      )
    }

    code += c
    if (i !== len - 1) {
      code += '\n\n'
    }
  }

  const codesData: any = {
    code,
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

  await fs.writeFile(options.output, result, options.encoding)
  if (options.ts) {
    let output = options.output
    const lastDotPos = output.lastIndexOf('.')
    if (lastDotPos > -1) {
      output = output.slice(0, lastDotPos)
    }
    output += '.d.ts'
    await fs.writeFile(output, tsResult, options.encoding)
  }
}

function extractTs(code: string) {
  let ret = ''

  const comments = util.extractBlockCmts(code)

  util.each(comments, function(comment) {
    const lines = util.trim(comment).split('\n')
    if (util.trim(lines[0]) !== 'typescript') {
      return
    }
    lines.shift()
    ret = util.trim(lines.join('\n'))
  })

  return ret
}
