import * as async from 'async'
import logger from '../../lib/logger'
import * as util from '../../lib/util'
import buildMod from './buildMod'

export default function(modList, codeTpl, options, cb) {
  logger.tpl(
    {
      data: modList.join(' ')
    },
    'MODULES FOUND\n{{#cyan}}{{{data}}}{{/cyan}}'
  )

  const codes = []
  const modMark = {}
  let i
  let len

  const excludeRef = (options.data.excludeRef = [])

  const walker = async.queue(async function(modName, walkerCb) {
    let result

    try {
      result = await buildMod(modName, codeTpl, options)
    } catch (e) {
      return cb(e)
    }

    const dependencies = result.dependencies
    const newDependencies = []
    let dependency
    let i
    let len

    for (i = 0, len = dependencies.length; i < len; i++) {
      dependency = dependencies[i]

      if (util.contain(options.exclude, dependency)) {
        excludeRef.push(dependency)
        continue
      }

      newDependencies.push(dependency)

      if (modMark.hasOwnProperty(dependency)) {
        continue
      }

      modMark[dependency] = true

      walker.push(dependency)
    }

    result.dependencies = newDependencies

    codes.push(result)
    walkerCb()
  }, 50)

  for (i = 0, len = modList.length; i < len; i++) {
    modMark[modList[i]] = true
    walker.push(modList[i])
  }

  if (len === 0) {
    cb(null, codes)
  }

  walker.drain = function() {
    cb(null, codes)
  }
}
