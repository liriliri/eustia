import * as program from 'commander'
import chalk from 'chalk'

const { version } = require('../package')

program.version(version)

program
  .command('build [input...]')
  .description('build utility libraries')
  .action(build)

program
  .command('help [command]')
  .description('display help information for a command')
  .action(function(command) {})

program.on('--help', () => {
  console.log(`
  Run for \`${chalk.bold(
    'eustia help <command>'
  )}\` for more information on specific commands  
  `)
})

const args = process.argv
program.parse(args)

function build() {}
