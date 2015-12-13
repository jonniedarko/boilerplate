var gulp = require('gulp');

// Tasks functions
var browserify = require('./gulp/browserify');
var html = require('./gulp/copy-html');
var nodemon = require('./gulp/nodemon');

// Tasks
gulp.task('build-browserify', browserify.build)
gulp.task('watch-browserify', browserify.watch)

gulp.task('watch-html', html.watch);
gulp.task('copy-html', html.copy);

gulp.task('watch', ['watch-html', 'watch-browserify']);

gulp.task('start', nodemon.dev)


gulp.task('default', ['watch', 'start']);
