var gulp = require('gulp');

// Tasks functions
var browserify = require('./gulp/browserify');
var html = require('./gulp/copy-html');
var nodemon = require('./gulp/nodemon');
var less = require('./gulp/less');

// Tasks
gulp.task('build-browserify', browserify.build);
gulp.task('watch-browserify', browserify.watch);

gulp.task('less', less.build);
gulp.task('watch-less', less.watch);


gulp.task('watch-html', html.watch);
gulp.task('copy-html', html.copy);

gulp.task('watch', ['watch-html','watch-less', 'watch-browserify']);

gulp.task('start', nodemon.dev)


gulp.task('default', ['watch', 'start']);
