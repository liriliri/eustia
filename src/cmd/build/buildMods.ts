var async = require('async')

var util = require('../../lib/util'),
  buildMod = require('./buildMod'),
  logger = require('../../lib/logger')

module.exports = function(modList, codeTpl, options, cb) {
  logger.tpl(
    {
      data: modList.join(' ')
    },
    'MODULES FOUND\n{{#cyan}}{{{data}}}{{/cyan}}'
  )

  logger.singleLine = true

  var codes = [],
    modMark = {},
    i,
    len

  var excludeRef = (options.data.excludeRef = [])

  var walker = async.queue(function(modName, walkerCb) {
    buildMod(modName, codeTpl, options, function(err, result) {
      if (err) return cb(err)

      var dependencies = result.dependencies,
        newDependencies = [],
        dependency,
        i,
        len

      for (i = 0, len = dependencies.length; i < len; i++) {
        dependency = dependencies[i]

        if (util.contain(options.exclude, dependency)) {
          excludeRef.push(dependency)
          continue
        }

        newDependencies.push(dependency)

        if (modMark.hasOwnProperty(dependency)) continue

        modMark[dependency] = true

        walker.push(dependency)
      }

      result.dependencies = newDependencies

      codes.push(result)
      walkerCb()
    })
  }, 50)

  for (i = 0, len = modList.length; i < len; i++) {
    modMark[modList[i]] = true
    walker.push(modList[i])
  }

  if (len === 0) cb(null, codes)

  walker.drain = function() {
    cb(null, codes)
  }
}
