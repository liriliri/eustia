const gulp = require('gulp')
const ts = require('gulp-typescript')

const tsconfig = require('./tsconfig')

gulp.task('build', () => {
  gulp.src(['src/**/*.ts'])
    .pipe(ts(tsconfig.compilerOptions))
    .pipe(gulp.dest('out'))
})

gulp.task('dev', () => {
  gulp.watch(['src/**/*.ts'], ['build'])
})

gulp.task('default', ['build'])