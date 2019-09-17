import fs from 'fs'
import util from '../../lib/util'

export default function(ast: any, options: any, cb: Function) {
  fs.exists(options.input, function(result) {
    if (!result) {
      return cb('Not found: ' + options.input)
    }

    fs.readFile(options.input, options.encoding, function(err, data: string) {
      if (err) {
        return cb(err)
      }

      ast.docs = process(data)

      cb()
    })
  })
}

function process(data: any) {
  const ret: any = {}

  data = breakApart(data)

  util.each(data, function(val: string) {
    let name: string

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

    const comments = util.extractBlockCmts(
      val.slice(val.indexOf('{') + 1, val.lastIndexOf('}'))
    )

    ret[name] = 'No documentation.'

    if (!util.isEmpty(comments)) {
      ret[name] = indentOneSpace(comments[0])
    }

    util.each(comments, comment => {
      if (util.startWith(comment, 'example')) {
        comment = comment.replace(/^example/, '')
        ret[name] += '\n\n```javascript' + indentOneSpace(comment) + '\n```'
      }
    })
  })

  return sortKeys(ret)
}

const regSeparator = /\/\* -{30} [$\w]+ -{30} \*\//

function breakApart(data: string) {
  return data.split(regSeparator).slice(1)
}

const regStartOneSpace = /^ /gm

function indentOneSpace(data: string) {
  return data.replace(regStartOneSpace, '')
}

function sortKeys(data: any) {
  const arr: any[] = []
  const ret: any = {}

  util.each(data, function(val, key) {
    arr.push({
      key,
      val
    })
  })

  arr.sort(function(a, b) {
    if (a.key === b.key) {
      return 0
    }
    if (a.key > b.key) {
      return 1
    }
    return -1
  })

  arr.forEach(function(val) {
    ret[val.key] = val.val
  })

  return ret
}
