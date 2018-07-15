class Logger {
  private logLevel: number
  constructor() {
    this.logLevel = 3
  }
  setLogLevel(level: number) {
    this.logLevel = level
  }
  write(message: string) {
    console.log(message)
  }
  log(message: string) {
    if (this.logLevel < 3) return
    this.write(message)
  }
}

export default new Logger()
