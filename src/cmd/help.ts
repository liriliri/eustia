import logger from '../lib/logger'
import util from '../lib/util'

export default function(options: any, cb: Function) {
  logger.log(
    util.cliHelp(options.command ? (commands as any)[options.command] : data)
  )
}

const commands = {
  build: {
    name: 'build',
    desc: 'Build JavaScript libraries',
    usage: [
      '[<options>]',
      'index.html',
      'index.html src/*.js',
      'index.html src/*.js -o lib.js'
    ],
    options: [
      {
        shorthand: 'e',
        name: 'exclude',
        desc: 'Modules excluded'
      },
      {
        name: 'encoding',
        desc: 'Input file encoding, default to utf8'
      },
      {
        shorthand: 'l',
        name: 'library',
        desc: 'External library paths'
      },
      {
        shorthand: 'i',
        name: 'include',
        desc: 'Modules included'
      },
      {
        name: 'ignore',
        desc: 'Files excluded'
      },
      {
        shorthand: 'n',
        name: 'namespace',
        desc: 'Namespace of the generated library, default to _'
      },
      {
        shorthand: 'o',
        name: 'output',
        desc: 'Output path, default to util.js'
      },
      {
        shorthand: 'f',
        name: 'format',
        desc: 'Module pattern, commonjs, umd or global, defaults to umd'
      },
      {
        name: 'transpiler',
        desc:
          'Transpiler to transform code, not accessible through command line'
      },
      {
        shorthand: 'w',
        name: 'watch',
        desc: 'Watch files to regenerate automatically'
      },
      {
        shorthand: 's',
        name: 'strict',
        desc: 'Use es5 strict mode'
      },
      {
        name: 'proxy',
        desc: 'Request proxy'
      },
      {
        name: 'ts',
        desc: 'Output typescript definition file'
      },
      {
        name: 'removeComments',
        desc: 'Remove comments'
      }
    ]
  },
  doc: {
    name: 'doc',
    desc: 'Generate documentation',
    usage: ['doc [<options>]', 'doc util.js -o docs.html'],
    options: [
      {
        shorthand: 'd',
        name: 'description',
        desc: 'Extra description markdown file path.'
      },
      {
        shorthand: 'o',
        name: 'output',
        desc: 'Output path, default to docs.html'
      },
      {
        shorthand: 't',
        name: 'title',
        desc: 'Documentation title'
      },
      {
        shorthand: 'f',
        name: 'format',
        desc: 'Output format, html, json or markdown, defaults to html'
      }
    ]
  }
}

const data = {
  name: 'eustia',
  usage: ['<command> [<options>]'],
  commands: util.map(commands, command => command)
}
