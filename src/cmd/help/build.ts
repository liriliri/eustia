module.exports = {
  command: 'build',
  desc: 'Build JavaScript libraries.',
  usage: [
    'build [<options>]',
    'build index.html',
    'build index.html src/*.js',
    'build index.html src/*.js -o lib.js'
  ],
  options: [
    {
      shorthand: '-e',
      flag: '--exclude',
      desc: 'Modules excluded'
    },
    {
      flag: '--encoding',
      desc: 'Input file encoding, default to utf8'
    },
    {
      shorthand: '-l',
      flag: '--library',
      desc: 'External library paths'
    },
    {
      shorthand: '-i',
      flag: '--include',
      desc: 'Modules included'
    },
    {
      flag: '--ignore',
      desc: 'Files excluded'
    },
    {
      shorthand: '-n',
      flag: '--namespace',
      desc: 'Namespace of the generated library, default to _'
    },
    {
      shorthand: '-o',
      flag: '--output',
      desc: 'Output path, default to util.js'
    },
    {
      shorthand: '-f',
      flag: '--format',
      desc: 'Module pattern, commonjs, umd or global, defaults to umd'
    },
    {
      flag: '--transpiler',
      desc: 'Transpiler to transform code, not accessible through command line'
    },
    {
      shorthand: '-w',
      flag: '--watch',
      desc: 'Watch files to regenerate automatically'
    },
    {
      shorthand: '-s',
      flag: '--strict',
      desc: 'Use es5 strict mode'
    },
    {
      flag: '--proxy',
      desc: 'Request proxy'
    }
  ]
};
