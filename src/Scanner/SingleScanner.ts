import * as fs from 'fs-extra'
import { Options } from '../Builder'

const IMPORT_RE = /\b(?:import\b|export\b|require\s*\()/

export default class SingleScanner {
  private path: string
  private options: Options
  private data: string
  constructor(path: string, options: Options) {
    this.path = path
    this.options = options
    this.data = ''
  }
  async run() {
    this.data = await fs.readFile(this.path, 'utf8')
    if (this.mightHaveDependencies()) {
      return this.collectDependencies()
    }

    return []
  }
  mightHaveDependencies() {
    return IMPORT_RE.test(this.data)
  }
  collectDependencies(): string[] {
    return []
  }
}
