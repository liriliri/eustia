module.exports = {
  command: 'doc',
  desc: 'Generate documentation.',
  usage: ['doc [<options>]', 'doc util.js -o docs.html'],
  options: [
    {
      shorthand: '-d',
      flag: '--description',
      desc: 'Extra description markdown file path.'
    },
    {
      shorthand: '-o',
      flag: '--output',
      desc: 'Output path, default to docs.html'
    },
    {
      shorthand: '-t',
      flag: '--title',
      desc: 'Documentation title'
    },
    {
      shorthand: '-f',
      flag: '--format',
      desc: 'Output format, html, json or markdown, defaults to html'
    }
  ]
}
