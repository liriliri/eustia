import fs from 'fs-extra'
import path from 'path'
import logger from '../../lib/logger'
import util from '../../lib/util'
import { SourceMapGenerator } from 'source-map'

export default async function(
  codes: any[],
  codesTpl: any,
  formatTpl: any,
  options: any
) {
  let code = ''
  let tsResult = '/* tslint:disable */\n\n'
  const dependencyGraph: any[] = []
  let allDependencies: any[] = []
  const codesMap: any = {}
  let codesOrder: string[]
  const map = new SourceMapGenerator({
    file: `eustia:///eustia/${path.basename(options.output)}`
  })

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

    codesMap[code.name] = code
  })

  allDependencies = util.unique(allDependencies)

  codesOrder = util.topoSort(dependencyGraph)
  // The first one is just a empty string, need to exclude it.
  codesOrder.shift()

  for (let i = 0, len = codesOrder.length; i < len; i++) {
    const name = codesOrder[i]
    const ts = codesMap[name].ts
    let c = codesMap[name].code

    if (options.ts) {
      if (ts) {
        tsResult += ts + '\n\n'
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

  if (options.sourcemap) {
    genSourceMap(map, result, codesMap, codesOrder)
    result += `\n//# sourceMappingURL=${path.basename(options.output)}.map`
  }

  if (util.isBrowser) return result

  await fs.writeFile(options.output, result, options.encoding)
  if (options.sourcemap) {
    await fs.writeFile(options.output + '.map', map.toString(), 'utf8')
  }
  if (options.ts) {
    let output = options.output
    const lastDotPos = output.lastIndexOf('.')
    if (lastDotPos > -1) {
      output = output.slice(0, lastDotPos)
    }
    output += '.d.ts'
    logger.tpl(
      {
        output
      },
      'OUTPUT d.ts {{#cyan}}{{{output}}}{{/cyan}}'
    )
    await fs.writeFile(output, tsResult, options.encoding)
  }

  return result
}

function genSourceMap(
  map: SourceMapGenerator,
  result: string,
  codesMap: any,
  codesOrder: string[]
) {
  const resultMap: any = {}
  const lines: string[] = result.split(/\n/)
  let curName = 'unknown'
  for (let i = 0, len = lines.length; i < len; i++) {
    let line = lines[i]
    const match = line.match(/\/\* -{30} ([$\w]+) -{30} \*\//)
    if (match) {
      curName = match[1]
    }
    const originalLen = line.length
    line = util.ltrim(line)
    const column = originalLen - line.length
    line = util.rtrim(line)
    if (line) {
      const name = line + ` ${curName}`
      if (!resultMap[name]) resultMap[name] = []
      resultMap[name].push({
        column,
        line: i + 1
      })
    }
  }
  for (let i = 0, len = codesOrder.length; i < len; i++) {
    const name = codesOrder[i]
    const source = `eustia:///${name}.js`
    const data = codesMap[name].source
    map.setSourceContent(source, data)
    const lines = data.split(/\n/)
    for (let i = 0, len = lines.length; i < len; i++) {
      let line = lines[i]
      const originalLen = line.length
      line = util.ltrim(line)
      const column = originalLen - line.length
      line = util.rtrim(line)
      if (line) {
        let result = resultMap[line + ` ${name}`]
        if (result) result = result.shift()
        if (result) {
          map.addMapping({
            source,
            generated: { line: result.line, column: result.column },
            original: { line: i + 1, column }
          })
        }
      }
    }
  }
}
