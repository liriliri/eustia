import * as program from 'commander'
import Builder, { Options } from './Builder'
import chalk from 'chalk'

const { version } = require('../package')

program.version(version)

program
  .command('build [input...]')
  .description('build utility libraries')
  .option('-o, --output <path>', 'set the output path. defaults to "util.js"')
  .option('-l, --libraries <paths>', 'external library paths.', list)
  .action(build)

program
  .command('help [command]')
  .description('display help information for a command')
  .action(function(command) {
    const cmd =
      program.commands.find((cmd: any) => cmd.name() === command) || program

    cmd.help()
  })

program.on('--help', () => {
  console.log(`
  Run for \`${chalk.bold(
    'eustia help <command>'
  )}\` for more information on specific commands  
  `)
})

const args = process.argv
program.parse(args)

function build(files: string[], command: Options) {
  const bundler = new Builder(files, command)

  bundler.build()
}

function list(val: string) {
  return val.split(',')
}
