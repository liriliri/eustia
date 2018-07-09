import * as glob from 'glob'
import { resolve } from 'path'
import isArray = require('lodash/isArray')

export interface Options {
  output: string
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
  normalizeOptions(options: Options) {
    return options
  }
}
