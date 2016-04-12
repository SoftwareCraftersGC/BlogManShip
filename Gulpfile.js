'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

gulp.task('lint', function () {
    return gulp.src(['**/*.js','!**/node_modules/**/*', '!**/bower_components/**/*'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', ['lint'], () => {
  return gulp.src(['Business/Tests/*.js'], {read: false}).pipe(mocha({reporter: 'spec'}));
});

gulp.task('test-watch', ['test'], () => gulp.watch('**/*.js', ['test']));
