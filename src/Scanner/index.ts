import { Options } from '../Builder'
import SingleScanner from './SingleScanner'

export default class Scanner {
  private options: Options
  constructor(options: Options) {
    this.options = options
  }
  async run(entryFiles: string[]) {
    const { output } = this.options

    const modules: string[] = []

    for (let i = 0, len = entryFiles.length; i < len; i++) {
      const scanner = new SingleScanner(entryFiles[i], this.options)

      modules.concat(await scanner.run())
    }

    return modules
  }
}
