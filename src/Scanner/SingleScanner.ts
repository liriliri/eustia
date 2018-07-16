import * as fs from 'fs-extra'
import { Options } from '../Builder'

export default class SingleScanner {
  private path: string
  private options: Options
  private code: string
  constructor(path: string, options: Options) {
    this.path = path
    this.options = options
    this.code = ''
  }
  async run() {
    this.code = await fs.readFile(this.path, 'utf8')

    return this.collectModules()
  }
  collectModules() {
    let modules: string[] = []

    if (regRequire.test(this.code)) {
      modules = modules.concat(this.collectCommonjsModules())
    }
    if (regImport.test(this.code)) {
      modules = modules.concat(this.collectEsModules())
    }

    return modules
  }
  collectCommonjsModules() {
    let modules: string[] = []

    return modules
  }
  collectEsModules() {
    let modules: string[] = []
    
    return modules
  }
  collectGlobalModules() {
    let modules: string[] = []

    return modules
  }
}

const regRequire = /require\(.*\)/
const regImport = /\bimport\b/
