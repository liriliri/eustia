import * as fs from 'fs'
import * as util from '../../lib/util'

export default function(ast, options, cb) {
  fs.exists(options.input, function(result) {
    if (!result) return cb('Not found: ' + options.input)

    fs.readFile(options.input, options.encoding, function(err, data) {
      if (err) return cb(err)

      ast['docs'] = process(data)

      cb()
    })
  })
}

function process(data) {
  var ret = {}

  data = breakApart(data)

  util.each(data, function(val) {
    var name

    val = util.trim(val)

    if (util.startWith(val, 'var')) {
      name = val.slice(4, val.indexOf('='))
    } else if (util.startWith(val, '_.')) {
      name = val.slice(2, val.indexOf('='))
    } else if (util.startWith(val, 'export')) {
      name = val.slice(11, val.indexOf('='))
    } else {
      return
    }

    var comments = util.extractBlockCmts(
      val.slice(val.indexOf('{') + 1, val.lastIndexOf('}'))
    )

    ret[name] = 'No documentation.'
    comments = util.filter(comments, function(comment) {
      if (
        util.startWith(comment, 'module') ||
        util.startWith(comment, 'dependencies')
      )
        return false

      return true
    })

    if (!util.isEmpty(comments)) ret[name] = indentOneSpace(comments[0])
  })

  return sortKeys(ret)
}

var regSeparator = /\/\* -{30} [$\w]+ -{30} \*\//

function breakApart(data) {
  return data.split(regSeparator).slice(1)
}

var regStartOneSpace = /^ /gm

function indentOneSpace(data) {
  return data.replace(regStartOneSpace, '')
}

function sortKeys(data) {
  var arr = [],
    ret = {}

  util.each(data, function(val, key) {
    arr.push({
      key: key,
      val: val
    })
  })

  arr.sort(function(a, b) {
    if (a.key === b.key) return 0
    if (a.key > b.key) return 1
    return -1
  })

  arr.forEach(function(val) {
    ret[val.key] = val.val
  })

  return ret
}
