import * as glob from 'glob'
import { resolve, dirname } from 'path'
import * as fs from 'fs-extra'
import isArray = require('lodash/isArray')

export interface Options {
  output: string
  libraries: string[]
}

export default class Bundler {
  private entryFiles: string[]
  private options: Options
  constructor(entryFiles: string[], options: Options) {
    this.entryFiles = this.normalizeEntries(entryFiles)
    this.options = this.normalizeOptions(options)
  }
  normalizeEntries(entryFiles: string[]) {
    if (entryFiles && !isArray(entryFiles)) {
      entryFiles = [entryFiles]
    }

    if (!entryFiles || entryFiles.length === 0) {
      entryFiles = ['js', 'ts', 'jsx', 'tsx', 'es', 'html'].reduce(
        (files, ext) => {
          return files.concat([
            `*.${ext}`,
            `src/**/*.${ext}`,
            `lib/**/*.${ext}`
          ])
        },
        []
      )
    }

    entryFiles = entryFiles.reduce(
      (paths, file) => paths.concat(glob.sync(file)),
      []
    )
    entryFiles = entryFiles.map(file => resolve(file))

    return entryFiles
  }
  normalizeOptions(options: Options): Options {
    return {
      libraries: this.normalizeLibraries(options.libraries),
      output: resolve(options.output || 'util.js')
    }
  }
  normalizeLibraries(libraries: string[] = []) {
    libraries.unshift('eustia')

    return libraries.map(library => resolve(library))
  }
  async build() {
    const { output } = this.options

    try {
      await fs.mkdirp(dirname(output))
    } catch (e) {}
  }
}
